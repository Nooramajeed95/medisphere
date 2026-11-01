import { useState } from "react";
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from "../../utils/appointments";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function AdminAppointments() {
  const [list, setList] = useState(getAllAppointments);

  const handleStatus = (id, status) => {
    updateAppointmentStatus(id, status);
    setList(getAllAppointments());
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this booking?")) {
      deleteAppointment(id);
      setList(getAllAppointments());
    }
  };

  return (
    <>
      <h2>Manage Appointments</h2>
      {list.length === 0 ? (
        <p>No bookings yet. Book an appointment as a customer first.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th><th>Doctor / Service</th><th>Type</th><th>Booked On</th><th>Appointment For</th><th>Details</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}<div className="muted">{a.email}</div></td>
                  <td>{a.doctor}</td>
                  <td>{a.specialty}</td>
                  <td>{new Date(a.id).toLocaleString()}</td>
                  <td>{a.date}<div className="muted">{a.time}</div></td>
                  <td>{a.symptoms}</td>
                  <td>
                    <select className="status-select" value={a.status} onChange={(e) => handleStatus(a.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><button className="remove" onClick={() => handleDelete(a.id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}