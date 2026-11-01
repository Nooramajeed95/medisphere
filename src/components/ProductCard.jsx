import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img className="card-img" src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <span className="tag">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="price">Rs. {product.price}</p>
      <div className="card-actions">
        <Link to={`/products/${product.id}`} className="btn btn-outline">Details</Link>
        <button className="btn" onClick={handleAdd}>{added ? "✓ Added" : "Add to Cart"}</button>
      </div>
    </div>
  );
}