import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserOrders, advanceStatus } from "../utils/orders";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => (user ? getUserOrders(user.email) : []));

  if (!user) return <Navigate to="/login" state={{ from: "/orders" }} />;

  const handleAdvance = (id) => {
    advanceStatus(id);
    setOrders(getUserOrders(user.email));
  };

  if (orders.length === 0) {
    return (
      <div className="center">
        <h2>No orders yet 📦</h2>
        <Link to="/products" className="btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <div className="order-head">
            <strong>Order #{order.id}</strong>
            <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
          </div>
          <p className="muted">{order.date}</p>
          <ul>
            {order.items.map((i, idx) => (
              <li key={idx} className="order-item">
                {i.image && <img className="order-img" src={i.image} alt={i.name} />}
                {i.name} × {i.qty} — Rs. {i.price * i.qty}
                </li>
            ))}
          </ul>
          <p className="muted">Delivery to: {order.address}</p>
          <div className="order-foot">
            <strong>Total: Rs. {order.total}</strong>
            {order.status !== "Delivered" && (
              <button className="btn btn-outline small" onClick={() => handleAdvance(order.id)}>
                Advance status (demo)
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}