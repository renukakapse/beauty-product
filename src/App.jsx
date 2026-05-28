import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./pages/Hero";
import Contact from "./pages/Contact";
import About from "./pages/About";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Myprofile from "./pages/user/Profile";

import Product from "./pages/product/Products";
import Productdetails from "./pages/product/Productdetails";

import Cart from "./pages/Cart";
import Orders from "./pages/order/Orders";
import Dashboard from "./pages/Dashboard";

import Checkout from "./pages/order/CheckOut";
import OrderSuccess from "./pages/order/OrderSuccess";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Myprofile />} />

        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Productdetails />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        {/* ✅ FIXED ROUTE */}
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;