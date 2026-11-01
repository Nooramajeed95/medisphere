import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 MediSphere. Always consult a doctor or pharmacist before use.</p>
      <p className="footer-links"><Link to="/admin/login">Admin Login</Link></p>
    </footer>
  );
}