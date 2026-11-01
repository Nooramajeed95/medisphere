import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";

export default function Login() {
  const { login } = useAuth();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.ok) {
      adminLogout(); // sign the admin out so only the customer is active
      navigate(from);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-bg"><form className="form auth" onSubmit={handleSubmit}>
      <h2>Welcome back 👋</h2>
      {error && <p className="error">{error}</p>}
      <input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" required value={form.password} onChange={handleChange} />
      <button className="btn" type="submit">Login</button>
      <p className="muted">New here? <Link to="/register" state={{ from }}>Create an account</Link></p>
    </form></div>
  );
}