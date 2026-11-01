import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
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
        <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}