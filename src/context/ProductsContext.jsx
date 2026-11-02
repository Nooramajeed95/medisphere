import { createContext, useContext, useEffect, useState } from "react";
import seed from "../data/products";

const KEY = "medisphere-products";
const ProductsContext = createContext();

const defaults = () => seed.map((p) => ({ ...p, stock: 50 }));

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    /* ignore */
  }
  return defaults();
};

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (data) =>
    setProducts((prev) => [...prev, { ...data, id: prev.reduce((m, p) => Math.max(m, p.id), 0) + 1 }]);

  const updateProduct = (id, changes) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const adjustStock = (id, delta) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, (p.stock || 0) + delta) } : p))
    );

  // called after an order is placed
  const reduceStock = (items) =>
    setProducts((prev) =>
      prev.map((p) => {
        const it = items.find((i) => i.id === p.id);
        return it && p.stock !== undefined ? { ...p, stock: Math.max(0, p.stock - it.qty) } : p;
      })
    );

  const resetProducts = () => setProducts(defaults());

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, adjustStock, reduceStock, resetProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);