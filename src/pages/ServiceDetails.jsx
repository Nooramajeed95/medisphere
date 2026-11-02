import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import services from "../data/services";
import doctors from "../data/doctors";
import branches from "../data/branches";
import { useAuth } from "../context/AuthContext";
import { addAppointment, getUserAppointments, cancelAppointment } from "../utils/appointments";

const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
const modes = ["Video Call", "Phone Call", "Chat"];

function ServicePage({ slug }) {
  const { user } = useAuth();
  const service = services.find((s) => s.slug === slug);
  const emptyForm = {
    date: "", time: "", notes: "", doctor: "", mode: "Video Call",
    location: "", phone: "", place: "Home", address: "", branch: "",
  };
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const loadBookings = () =>
    user ? getUserAppointments(user.email).filter((a) => a.service === slug) : [];
  const [bookings, setBookings] = useState(loadBookings);
  const today = new Date().toISOString().split("T")[0];
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  if (!service || !service.items) {
    return <p>Service not found. <Link to="/">Back to Home</Link></p>;
  }

  const bookable = slug === "lab-tests" || slug === "vaccination";
  const isTele = slug === "telemedicine";
  const isEmergency = slug === "emergency-care";
    let items = service.items.filter(
    (i) =>
      !bookable ||
      ((minPrice === "" || i.price >= Number(minPrice)) &&
        (maxPrice === "" || i.price <= Number(maxPrice)))
  );
  if (bookable && sort === "az") items.sort((a, b) => a.title.localeCompare(b.title));
  if (bookable && sort === "za") items.sort((a, b) => b.title.localeCompare(a.title));
  if (bookable && sort === "low") items.sort((a, b) => a.price - b.price);
  if (bookable && sort === "high") items.sort((a, b) => b.price - a.price);

  const showForm = isTele || isEmergency || (bookable && selected);
  const formTitle = isEmergency
    ? "Request Emergency Help"
    : isTele
    ? "Book an Online Consultation"
    : `Book: ${selected}`;

  const chosenDoctor = doctors.find((d) => d.name === form.doctor);
  const chosenBranch = branches.find((b) => b.name === form.branch);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const base = { email: user.email, name: user.name, service: slug, status: "Pending" };

    if (isEmergency) {
      addAppointment({
        ...base,
        doctor: "Emergency Request",
        specialty: service.title,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        symptoms: `${form.notes} (Location: ${form.location}, Phone: ${form.phone})`,
      });
      setMessage("✅ Request received. If this is life-threatening, call 1122 right now.");
    } else if (isTele) {
      addAppointment({
        ...base,
        doctor: form.doctor,
        specialty: `${chosenDoctor.specialty} · ${form.mode}`,
        date: form.date,
        time: form.time,
        symptoms: form.notes,
      });
      setMessage("✅ Online consultation booked! Your doctor will contact you at the chosen time (demo).");
    } else {
      const isHome = form.place === "Home";
      const where = isHome
        ? `Home visit by our worker — ${form.address}`
        : `Pharmacy visit — ${form.branch}`;
      addAppointment({
        ...base,
        doctor: selected,
        specialty: `${service.title} · ${isHome ? "Home visit" : "Pharmacy visit"}`,
        date: form.date,
        time: form.time,
        location: where,
        symptoms: form.notes ? `${where}. Notes: ${form.notes}` : where,
      });
      setMessage(`✅ ${selected} booked successfully!`);
      setSelected(null);
    }
    setBookings(loadBookings());
    setForm(emptyForm);
  };

  const handleCancel = (id) => {
    cancelAppointment(id);
    setBookings(loadBookings());
  };

  return (
    <div className="svc-detail">
      <div className="service-icon">{service.icon}</div>
      <h2>{service.title}</h2>
        <p className="muted">{service.intro}</p>

      {bookable && (
        <div className="filter-bar">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="az">Name: A to Z</option>
            <option value="za">Name: Z to A</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
          <input type="number" min="0" placeholder="Min Rs." value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <input type="number" min="0" placeholder="Max Rs." value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <button type="button" className="btn btn-outline small" onClick={() => { setSort("default"); setMinPrice(""); setMaxPrice(""); }}>Clear</button>
        </div>
      )}
      {bookable && items.length === 0 && <p>Nothing matches this price range.</p>}

      <div>
        {items.map((item) => (
          <div key={item.title} className="svc-item">
            <div>
              <strong>{item.title}</strong>
                            <div className="muted">{item.price ? `Rs. ${item.price} · ` : ""}{item.text}</div>
            </div>
            {bookable && (
              <button
                type="button"
                className={`btn small ${selected === item.title ? "" : "btn-outline"}`}
                onClick={() => { setSelected(item.title); setMessage(""); }}
              >
                {selected === item.title ? "Selected" : "Book"}
              </button>
            )}
          </div>
        ))}
      </div>

      {isEmergency && (
        <p style={{ marginTop: 16 }}>
          <a href="tel:1122" className="btn btn-danger">📞 Call Rescue 1122</a>
        </p>
      )}

      {message && <p className="success" style={{ marginTop: 16 }}>{message}</p>}

      {!user ? (
        <div className="center">
          <h3>Please login to continue 🔒</h3>
          <Link to="/login" state={{ from: `/services/${slug}` }} className="btn">Login</Link>{" "}
          <Link to="/register" state={{ from: `/services/${slug}` }} className="btn btn-outline">Register</Link>
        </div>
      ) : (
        showForm && (
          <form className="form appt-form" onSubmit={handleSubmit}>
            <h3>{formTitle}</h3>

            {isEmergency ? (
              <>
                <input name="phone" placeholder="Contact phone number" required value={form.phone} onChange={handleChange} />
                <input name="location" placeholder="Your current location / address" required value={form.location} onChange={handleChange} />
                <textarea name="notes" placeholder="What is the emergency?" required value={form.notes} onChange={handleChange} />
              </>
            ) : (
              <>
                {isTele && (
                  <>
                    <div className="form-row">
                      <label className="field">Doctor
                        <select name="doctor" required value={form.doctor} onChange={handleChange}>
                          <option value="">Select a doctor</option>
                          {doctors.map((d) => <option key={d.id}>{d.name}</option>)}
                        </select>
                      </label>
                      <label className="field">Specialty
                        <input value={chosenDoctor ? chosenDoctor.specialty : ""} placeholder="Specialty" readOnly />
                      </label>
                    </div>
                    <label className="field">Consultation Type
                      <select name="mode" value={form.mode} onChange={handleChange}>
                        {modes.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </label>
                  </>
                )}

                {bookable && (
                  <>
                    <label className="field">Where would you like it done?
                      <select name="place" value={form.place} onChange={handleChange}>
                        <option value="Home">🏠 At home (our worker visits you)</option>
                        <option value="Pharmacy">🏪 At a MediSphere pharmacy</option>
                      </select>
                    </label>

                    {form.place === "Home" ? (
                      <label className="field">Your Home Address
                        <textarea name="address" placeholder="House no., street, area, city" required value={form.address} onChange={handleChange} />
                      </label>
                    ) : (
                      <>
                        <label className="field">Choose a Pharmacy
                          <select name="branch" required value={form.branch} onChange={handleChange}>
                            <option value="">Select a branch</option>
                            {branches.map((b) => <option key={b.id}>{b.name}</option>)}
                          </select>
                        </label>
                        {chosenBranch && (
                          <p className="muted">📍 {chosenBranch.address} · 🕒 {chosenBranch.hours}</p>
                        )}
                      </>
                    )}
                  </>
                )}

                <div className="form-row">
                  <label className="field">Preferred Date
                    <input type="date" name="date" min={today} required value={form.date} onChange={handleChange} />
                  </label>
                  <label className="field">Preferred Time
                    <select name="time" required value={form.time} onChange={handleChange}>
                      <option value="">Select Time</option>
                      {times.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                </div>
                <textarea
                  name="notes"
                  placeholder={isTele ? "Describe your symptoms..." : "Any notes (optional)"}
                  required={isTele}
                  value={form.notes}
                  onChange={handleChange}
                />
              </>
            )}

            <button className={`btn ${isEmergency ? "btn-danger" : ""}`} type="submit">
              {isEmergency ? "Send Emergency Request" : "Confirm Booking"}
            </button>
          </form>
        )
      )}

      {user && bookings.length > 0 && (
        <>
          <h3 style={{ marginTop: 24 }}>My Bookings</h3>
          {bookings.map((a) => (
            <div key={a.id} className="appt">
              <div>
                <strong>{a.doctor}</strong> <span className="muted">({a.specialty})</span>
                <div className="muted">{a.date} at {a.time}</div>
                {a.location && <div className="muted">📍 {a.location}</div>}
              </div>
              <div>
                <span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span>{" "}
                {a.status === "Pending" && !isEmergency && (
                  <button className="btn btn-outline small" onClick={() => handleCancel(a.id)}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      <p style={{ marginTop: 20 }}>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </p>
    </div>
  );
}

export default function ServiceDetails() {
  const { slug } = useParams();
  return <ServicePage key={slug} slug={slug} />;
}