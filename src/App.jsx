import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DateBar from "./components/DateBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Consultation from "./pages/Consultation";
import ServiceDetails from "./pages/ServiceDetails";
import VerseBar from "./components/VerseBar";

export default function App() {
  return (
    <>
      <VerseBar />
      <Navbar />
      <DateBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}