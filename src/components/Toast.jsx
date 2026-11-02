import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast, closeToast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast">
      <span>{toast}</span>
      <Link to="/cart" className="btn small" onClick={closeToast}>View Cart</Link>
      <button className="toast-x" onClick={closeToast}>✕</button>
    </div>
  );
}