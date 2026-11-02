import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import doctors from "../../data/doctors";
import { getAllOrders } from "../../utils/orders";
import { getAllAppointments } from "../../utils/appointments";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("medisphere-users")) || [];
  } catch {
    return [];
  }
};

export default function Dashboard() {
  const { products } = useProducts();
  const orders = getAllOrders();
  const appointments = getAllAppointments();
  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { icon: "👥", label: "Users", value: readUsers().length },
    { icon: "💊", label: "Products", value: products.length },
    { icon: "🗂️", label: "Categories", value: new Set(products.map((p) => p.category)).size },
    { icon: "📦", label: "Orders", value: orders.length },
    { icon: "🩺", label: "Doctors", value: doctors.length },
    { icon: "📅", label: "Appointments", value: appointments.length },
    { icon: "💰", label: "Revenue", value: `Rs. ${revenue}` },
  ];

  return (
    <>
      <h2>Dashboard</h2>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span>{s.icon}</span>
            <strong>{s.value}</strong>
            <small>{s.label}</small>
          </div>
        ))}
      </div>

      <h3 style={{ margin: "28px 0 12px" }}>Quick Links</h3>
      <div className="services">
        <Link to="/admin/orders" className="service-card">
          <div className="service-icon">📦</div>
          <h3>Manage Orders</h3>
          <p>View orders and update their status.</p>
        </Link>
        <Link to="/admin/appointments" className="service-card">
          <div className="service-icon">📅</div>
          <h3>Manage Appointments</h3>
          <p>Confirm, complete or cancel bookings.</p>
        </Link>
      </div>
    </>
  );
}