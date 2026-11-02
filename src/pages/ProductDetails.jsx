import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found. <Link to="/products">Back</Link></p>;
  const out = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="details">
      <img className="details-img" src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = "/images/Logo.jpg"; }} />
      <div>
        <span className="tag">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">Rs. {product.price}</p>
        <p className={out || product.stock <= 5 ? "stock-note" : "muted"}>
          {out ? "Out of stock" : `In stock: ${product.stock}`}
        </p>
        <button className="btn" onClick={() => addToCart(product)} disabled={out}>Add to Cart</button>{" "}
        <Link to="/products" className="btn btn-outline">Back</Link>
      </div>
    </div>
  );
}