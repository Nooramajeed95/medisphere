import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import doctors from "../data/doctors";
import { useAuth } from "../context/AuthContext";
import { addAppointment, getUserAppointments, cancelAppointment } from "../utils/appointments";

const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const why = [
  { icon: "🏅", title: "Certified Doctors", text: "All our doctors are fully certified and experienced professionals." },
  { icon: "🕒", title: "Flexible Timings", text: "Book appointments at your convenience, 6 days a week." },
  { icon: "🛡️", title: "Confidential", text: "Your medical information is always kept private and secure." },
  { icon: "🎥", title: "Online & In-Person", text: "Choose between virtual consultations or in-clinic visits." },
];

export default function Consultation() {
  const { user } = useAuth();
  const formRef = useRef(null);
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ date: "", time: "", symptoms: "" });
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState(() => (user ? getUserAppointments(user.email) : []));
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectDoctor = (d) => {
    setDoctor(d);
    setMessage("");
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctor) {
      setMessage("Please select a doctor first.");
      return;
    }
    addAppointment({
      email: user.email,
      name: user.name,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: form.date,
      time: form.time,
      symptoms: form.symptoms,
      status: "Pending",
    });
    setAppointments(getUserAppointments(user.email));
    setForm({ date: "", time: "", symptoms: "" });
    setDoctor(null);
    setMessage("✅ Appointment booked! We will confirm it shortly.");
  };

  const handleCancel = (id) => {
    cancelAppointment(id);
    setAppointments(getUserAppointments(user.email));
  };

  return (
    <>
      <h2 className="section-title">Our Specialist Doctors</h2>
      <p className="section-sub">Experienced professionals dedicated to your health and wellbeing.</p>

      <div className="doctor-grid">
        {doctors.map((d) => (
          <div key={d.id} className={`doctor-card ${doctor?.id === d.id ? "selected" : ""}`}>
            <img className="doc-img" src={d.image} alt={d.name} />
            <h3>{d.name}</h3>
            <span className="doc-title">{d.title}</span>
            <p className="muted">{d.experience} of experience.</p>
            <div className="doc-meta">
              <span>⭐ {d.rating}</span>
              <span>🕒 {d.schedule}</span>
            </div>
            <button className="btn" onClick={() => selectDoctor(d)}>Book Appointment</button>
          </div>
        ))}
      </div>

      <h2 className="section-title">Why Choose MediSphere?</h2>
      <div className="why">
        {why.map((w) => (
          <div key={w.title}>
            <span>{w.icon}</span>
            <h4>{w.title}</h4>
            <p>{w.text}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title" ref={formRef}>Book an Appointment</h2>
      <p className="section-sub">Fill in the form below and we'll confirm your appointment shortly.</p>

      {message && <p className="success center-msg">{message}</p>}

      {!user ? (
        <div className="center">
          <h3>Please login to book an appointment 🔒</h3>
          <Link to="/login" state={{ from: "/consultation" }} className="btn">Login</Link>{" "}
<Link to="/register" state={{ from: "/consultation" }} className="btn btn-outline">Register</Link>
        </div>
      ) : (
        <form className="form appt-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="field">Your Name<input value={user.name} readOnly /></label>
            <label className="field">Email<input value={user.email} readOnly /></label>
          </div>
          <div className="form-row">
            <label className="field">Doctor<input value={doctor ? doctor.name : ""} placeholder="Select a doctor above" readOnly /></label>
            <label className="field">Specialty<input value={doctor ? doctor.specialty : ""} placeholder="Specialty" readOnly /></label>
          </div>
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
          <label className="field">Describe Your Symptoms
            <textarea name="symptoms" required placeholder="Briefly describe your symptoms or reason for visit..." value={form.symptoms} onChange={handleChange} />
          </label>
          <button className="btn" type="submit">Confirm Appointment</button>
        </form>
      )}

      {user && appointments.length > 0 && (
        <>
          <h2 className="section-title">My Appointments</h2>
          {appointments.map((a) => (
            <div key={a.id} className="appt">
              <div>
                <strong>{a.doctor}</strong> <span className="muted">({a.specialty})</span>
                <div className="muted">{a.date} at {a.time}</div>
                <div className="muted">Symptoms: {a.symptoms}</div>
              </div>
              <div>
                <span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span>{" "}
                {a.status === "Pending" && (
                  <button className="btn btn-outline small" onClick={() => handleCancel(a.id)}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}