import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { isEmail, isPhone, isName, isPassword } from "../utils/validate";

export default function Register() {
  const { register, login } = useAuth();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isName(form.name)) errs.name = "Enter your full name (letters only, at least 3 characters).";
    if (!isEmail(form.email)) errs.email = "Enter a valid email, for example name@gmail.com";
    if (!isPhone(form.phone)) errs.phone = "Enter a valid mobile number, for example 03001234567";
    if (!isPassword(form.password)) errs.password = "Password needs at least 6 characters, with a letter and a number.";
    if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    setErrors(errs);
    setError("");
    if (Object.keys(errs).length) return;

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
    <div className="auth-bg">
      <form className="form auth" onSubmit={handleSubmit} noValidate>
        <h2>Create your account</h2>
        {error && <p className="error">{error}</p>}
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="field-error">{errors.name}</small>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.email && <small className="field-error">{errors.email}</small>}
        <input name="phone" placeholder="Mobile number (03001234567)" value={form.phone} onChange={handleChange} />
        {errors.phone && <small className="field-error">{errors.phone}</small>}
        <input name="password" type="password" placeholder="Password (min 6, letter + number)" value={form.password} onChange={handleChange} />
        {errors.password && <small className="field-error">{errors.password}</small>}
        <input name="confirm" type="password" placeholder="Confirm password" value={form.confirm} onChange={handleChange} />
        {errors.confirm && <small className="field-error">{errors.confirm}</small>}
        <button className="btn" type="submit">Register</button>
        <p className="muted">Already have an account? <Link to="/login" state={{ from }}>Login</Link></p>
      </form>
    </div>
  );
}