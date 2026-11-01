import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { adminLogin } = useAdmin();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = adminLogin(form.username, form.password);
    if (result.ok) {
      logout(); // sign the customer out so only the admin is active
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-bg">
      <form className="form auth" onSubmit={handleSubmit}>
        <h2>🛠️ Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input name="username" placeholder="Admin username" required value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required value={form.password} onChange={handleChange} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}