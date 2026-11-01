import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQty, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="center">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="btn">Browse Products</Link>
      </div>
    );
  }

  return (
    <>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-row">
          <img className="cart-img" src={item.image} alt={item.name} />
          <div className="cart-info">
            <strong>{item.name}</strong>
            <div>Rs. {item.price}</div>
          </div>
          <div className="qty">
            <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
          </div>
          <strong>Rs. {item.price * item.qty}</strong>
          <button className="remove" onClick={() => removeFromCart(item.id)}>✕</button>
        </div>
      ))}
      <h3 className="total">Total: Rs. {total}</h3>
      <Link to="/checkout" className="btn">Proceed to Checkout</Link>
    </>
  );
}