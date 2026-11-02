import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("medisphere-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    localStorage.setItem("medisphere-cart", JSON.stringify(cart));
  }, [cart]);

  const flash = (text) => {
    setToast(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 4000);
  };
  const closeToast = () => setToast(null);

  const stockOf = (id) => {
    const p = products.find((x) => x.id === id);
    return p && p.stock !== undefined ? p.stock : Infinity;
  };

  const addToCart = (product) => {
    if (!user) {
      navigate("/login", {
        state: { from: location.pathname + location.search, message: "Please log in first to add medicines to your cart." },
      });
      return false;
    }
    const inCart = cart.find((i) => i.id === product.id)?.qty || 0;
    const stock = stockOf(product.id);
    if (inCart >= stock) {
      flash(stock === 0 ? `⚠️ ${product.name} is out of stock` : `⚠️ Only ${stock} of ${product.name} in stock`);
      return false;
    }
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
    flash(`✅ ${product.name} added to cart`);
    return true;
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    const stock = stockOf(id);
    if (qty > stock) {
      flash(`⚠️ Only ${stock} in stock`);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, toast, closeToast }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);