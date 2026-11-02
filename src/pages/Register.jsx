import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import PasswordInput from "../components/PasswordInput";
import { isEmail, isPhone, isName, isPassword, isAddress } from "../utils/validate";

export default function Register() {
  const { register, login } = useAuth();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 11); // digits only, max 11
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isName(form.name)) errs.name = "Enter your full name (letters only, at least 3 characters).";
    if (!isEmail(form.email)) errs.email = "Enter a valid email with a domain ending, for example name@gmail.com";
    if (!isPhone(form.phone)) errs.phone = "Mobile number must be exactly 11 digits and start with 03, for example 03001234567.";
    if (!isAddress(form.address)) errs.address = "Enter your full address (at least 10 characters).";
    if (!isPassword(form.password)) errs.password = "Password needs at least 8 characters with a letter, a number and a special character (for example @ or !).";
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

        <input name="email" type="email" placeholder="Email (name@gmail.com)" value={form.email} onChange={handleChange} />
        {errors.email && <small className="field-error">{errors.email}</small>}

        <input name="phone" inputMode="numeric" placeholder="Mobile number (03001234567)" value={form.phone} onChange={handleChange} />
        {errors.phone && <small className="field-error">{errors.phone}</small>}

        <textarea name="address" placeholder="Full delivery address" value={form.address} onChange={handleChange} />
        {errors.address && <small className="field-error">{errors.address}</small>}

        <PasswordInput name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <small className="muted">At least 8 characters with a letter, a number and a special character (@, #, !)</small>
        {errors.password && <small className="field-error">{errors.password}</small>}

        <PasswordInput name="confirm" placeholder="Confirm password" value={form.confirm} onChange={handleChange} />
        {errors.confirm && <small className="field-error">{errors.confirm}</small>}

        <button className="btn" type="submit">Register</button>
        <p className="muted">Already have an account? <Link to="/login" state={{ from }}>Login</Link></p>
      </form>
    </div>
  );
}