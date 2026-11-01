import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function AdminLayout() {
  const { isAdmin, adminLogout } = useAdmin();
  const navigate = useNavigate();

  if (!isAdmin) return <Navigate to="/admin/login" />;

  const handleLogout = () => {
    adminLogout();
    navigate("/");
  };

  return (
    <>
      <div className="admin-bar">
        <h2>🛠️ Admin Panel</h2>
        <nav className="admin-nav">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/appointments">Appointments</NavLink>
          <button className="btn btn-outline small" onClick={handleLogout}>Admin Logout</button>
        </nav>
      </div>
      <Outlet />
    </>
  );
}