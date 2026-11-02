import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const out = product.stock !== undefined && product.stock <= 0;
  const low = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

  const handleAdd = () => {
    if (!addToCart(product)) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img
          className="card-img"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "/images/Logo.jpg"; }}
        />
      </Link>
      <span className="tag">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="price">Rs. {product.price}</p>
      {out && <span className="stock-note">Out of stock</span>}
      {low && <span className="stock-note">Only {product.stock} left</span>}
      <div className="card-actions">
        <Link to={`/products/${product.id}`} className="btn btn-outline">Details</Link>
        <button className="btn" onClick={handleAdd} disabled={out}>
          {out ? "Out of stock" : added ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}