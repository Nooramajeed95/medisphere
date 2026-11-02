import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = ["All", ...new Set(products.map((p) => p.category))];
const lowest = Math.min(...products.map((p) => p.price));
const highest = Math.max(...products.map((p) => p.price));

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const min = minPrice === "" ? 0 : Number(minPrice);
  const max = maxPrice === "" ? Infinity : Number(maxPrice);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      p.price >= min &&
      p.price <= max
  );

  if (sort === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  const clearAll = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      <h2>Pharmacy</h2>
      <div className="pills">
        {categories.map((c) => (
          <button
            key={c}
            className={`pill ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="grow"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="az">Name: A to Z</option>
          <option value="za">Name: Z to A</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <input
          type="number"
          min="0"
          placeholder={`Min Rs. ${lowest}`}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder={`Max Rs. ${highest}`}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button className="btn btn-outline small" onClick={clearAll}>Clear</button>
      </div>

      <p className="result-count">Showing {filtered.length} of {products.length} medicines</p>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}