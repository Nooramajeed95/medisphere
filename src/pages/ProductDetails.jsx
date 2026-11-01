import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found. <Link to="/products">Back</Link></p>;

  return (
    <div className="details">
      <img className="details-img" src={product.image} alt={product.name} />
      <div>
        <span className="tag">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">Rs. {product.price}</p>
        <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>{" "}
        <Link to="/products" className="btn btn-outline">Back</Link>
      </div>
    </div>
  );
}