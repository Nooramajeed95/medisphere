import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";

export default function Register() {
  const { register, login } = useAuth();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = register(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    login(form.email, form.password);
    adminLogout();
    navigate(from);
  };

  return (
    <div className="auth-bg"><form className="form auth" onSubmit={handleSubmit}>
      <h2>Create your account</h2>
      {error && <p className="error">{error}</p>}
      <input name="name" placeholder="Full name" required value={form.name} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone number" required value={form.phone} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password (min 6 characters)" required value={form.password} onChange={handleChange} />
      <button className="btn" type="submit">Register</button>
      <p className="muted">Already have an account? <Link to="/login" state={{ from }}>Login</Link></p>
    </form></div>
  );
}