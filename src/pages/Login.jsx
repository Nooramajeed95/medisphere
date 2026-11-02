import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { isEmail } from "../utils/validate";

export default function Login() {
  const { login } = useAuth();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const message = location.state?.message;
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isEmail(form.email)) errs.email = "Enter a valid email, for example name@gmail.com";
    if (!form.password) errs.password = "Enter your password.";
    setErrors(errs);
    setError("");
    if (Object.keys(errs).length) return;

    const result = login(form.email, form.password);
    if (result.ok) {
      adminLogout();
      navigate(from);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-bg">
      <form className="form auth" onSubmit={handleSubmit} noValidate>
        <h2>Welcome back 👋</h2>
        {message && <p className="info">{message}</p>}
        {error && <p className="error">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="field-error">{errors.email}</small>}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.password && <small className="field-error">{errors.password}</small>}
        <button className="btn" type="submit">Login</button>
        <p className="muted">New here? <Link to="/register" state={{ from }}>Create an account</Link></p>
      </form>
    </div>
  );
}