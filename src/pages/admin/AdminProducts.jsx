import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";

const empty = { name: "", category: "", price: "", stock: "", image: "", description: "" };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock, resetProducts } = useProducts();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const categories = [...new Set(products.map((p) => p.category))];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (!name || !category) return setError("Name and category are required.");
    if (!(price > 0)) return setError("Price must be more than 0.");
    if (!Number.isInteger(stock) || stock < 0) return setError("Stock must be a whole number, 0 or more.");

    const img = form.image.trim();
    const data = {
      name,
      category,
      price,
      stock,
      image: img ? (img.startsWith("/") ? img : `/images/${img}`) : "/images/Logo.jpg",
      description: form.description.trim() || `${name}. Please use as directed by your doctor or pharmacist.`,
    };
    if (editingId) updateProduct(editingId, data);
    else addProduct(data);
    setForm(empty);
    setEditingId(null);
    setError("");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock ?? 0),
      image: p.image.replace("/images/", ""),
      description: p.description,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(empty);
    setError("");
  };

  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      deleteProduct(p.id);
      if (editingId === p.id) cancelEdit();
    }
  };

  const shown = [...products]
    .reverse()
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h2>Manage Products</h2>

      <form className="form admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
        {error && <p className="error">{error}</p>}
        <div className="form-row">
          <label className="field">Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Panadol" />
          </label>
          <label className="field">Category
            <input name="category" list="cats" value={form.category} onChange={handleChange} placeholder="e.g. Pain Relief" />
            <datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
          </label>
        </div>
        <div className="form-row">
          <label className="field">Price (Rs.)
            <input name="price" type="number" min="1" value={form.price} onChange={handleChange} />
          </label>
          <label className="field">Stock (quantity)
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
          </label>
        </div>
        <label className="field">Image file name (from public/images)
          <input name="image" value={form.image} onChange={handleChange} placeholder="e.g. Arinac.jpg (leave empty for the logo)" />
        </label>
        <label className="field">Description (optional)
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <div className="row-actions">
          <button className="btn" type="submit">{editingId ? "Save Changes" : "Add Product"}</button>
          {editingId && <button className="btn btn-outline" type="button" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="filter-bar">
        <input className="grow" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button
          className="btn btn-outline small"
          onClick={() => window.confirm("Reset all products and stock to the original list?") && resetProducts()}
        >
          Reset to default
        </button>
      </div>
      <p className="result-count">{shown.length} products</p>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id}>
                <td><img className="order-img" src={p.image} alt={p.name} /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>Rs. {p.price}</td>
                <td>
                  <div className="stock-ctl">
                    <button onClick={() => adjustStock(p.id, -1)}>−</button>
                    <span className={p.stock <= 5 ? "low" : ""}>{p.stock}</span>
                    <button onClick={() => adjustStock(p.id, 1)}>+</button>
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn-outline small" onClick={() => startEdit(p)}>Edit</button>
                    <button className="btn btn-danger small" onClick={() => handleDelete(p)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}