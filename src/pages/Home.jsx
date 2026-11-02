import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import services from "../data/services";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products } = useProducts();
  const [sent, setSent] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <>
      <section
        className="hero hero-bg"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,50,110,0.65), rgba(13,50,110,0.5)), url('/images/Doctor.png')",
        }}
      >
        <h1>Trusted Medical Care, Anytime</h1>
        <p>Discover top-quality medicine and get healthy. Healthy Life, Happy Family.</p>
        <div className="hero-btns">
          <Link to="/consultation" className="btn btn-light">Book Appointment</Link>
          <Link to="/products" className="btn btn-accent">Shop Medicines</Link>
        </div>
      </section>

      <h2 className="section-title">Our Services</h2>
      <p className="section-sub">Explore our wide range of medicine and essential services.</p>
      <div className="services">
        {services.map((s) => (
          <Link key={s.slug} to={s.link || `/services/${s.slug}`} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Featured Products</h2>
      <div className="grid">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h2 className="section-title">Contact Us</h2>
      <p className="section-sub">Have a question? Send us a message.</p>
      <div className="contact">
        {sent && <p className="success">✅ Thank you! We will get back to you soon.</p>}
        <form className="form" onSubmit={handleContact}>
          <input placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <textarea placeholder="Your message" required />
          <button className="btn" type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}