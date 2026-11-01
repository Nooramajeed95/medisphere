import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addOrder } from "../utils/orders";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user ? user.name : "",
    phone: user ? user.phone : "",
    address: "",
  });
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = addOrder({
      email: user.email,
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: cart.map((i) => ({ name: i.name, image: i.image, qty: i.qty, price: i.price })),
      total,
      status: "Pending",
      date: new Date().toLocaleString(),
    });
    setOrderId(id);
    clearCart();
  };

  if (orderId) {
    return (
      <div className="center">
        <h2>✅ Order #{orderId} placed!</h2>
        <p>Thank you for shopping with MediSphere.</p>
        <Link to="/orders" className="btn">View My Orders</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="center">
        <h2>Please login to place your order 🔒</h2>
        <Link to="/login" state={{ from: "/consultation" }} className="btn">Login</Link>{" "}
<Link to="/register" state={{ from: "/consultation" }} className="btn btn-outline">Register</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return <p>Your cart is empty. <Link to="/products">Shop now</Link></p>;
  }

  return (
    <>
      <h2>Checkout</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full name" required value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone number" required value={form.phone} onChange={handleChange} />
        <textarea name="address" placeholder="Delivery address" required value={form.address} onChange={handleChange} />
        <h3>Total: Rs. {total}</h3>
        <button className="btn" type="submit">Place Order</button>
      </form>
    </>
  );
}