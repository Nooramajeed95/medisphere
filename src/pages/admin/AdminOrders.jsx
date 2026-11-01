import { useState } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../../utils/orders";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState(getAllOrders);

  const handleStatus = (id, status) => {
    updateOrderStatus(id, status);
    setOrders(getAllOrders());
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete order #${id}?`)) {
      deleteOrder(id);
      setOrders(getAllOrders());
    }
  };

  return (
    <>
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. Place an order as a customer first.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.name}<div className="muted">{o.email}</div></td>
                  <td>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</td>
                  <td>Rs. {o.total}</td>
                  <td>{o.date}</td>
                  <td>
                    <select className="status-select" value={o.status} onChange={(e) => handleStatus(o.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><button className="remove" onClick={() => handleDelete(o.id)}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}