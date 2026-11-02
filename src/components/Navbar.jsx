import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("medisphere-theme") === "dark");
    const [term, setTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setTerm("");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("medisphere-theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img className="logo-img" src="/images/Logo.jpg" alt="MediSphere logo" />
        MediSphere
      </Link>
      <nav>
        <form className="nav-search" onSubmit={handleSearch}>
          <input type="search" placeholder="Search medicines..." value={term} onChange={(e) => setTerm(e.target.value)} />
        </form>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Pharmacy</NavLink>
        <NavLink to="/consultation">Consultation</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        <NavLink to="/cart">Cart ({count})</NavLink>
        {user ? (
          <>
            <NavLink to="/orders">My Orders</NavLink>
            <span className="hello">Hi, {user.name.split(" ")[0]}</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        <button className="link-btn" onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
}