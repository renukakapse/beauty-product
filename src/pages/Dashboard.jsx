import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaShoppingCart, FaBoxOpen, FaHeart } from "react-icons/fa";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const storedUser = localStorage.getItem("user");

  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const BASE_URL = "https://e-commerce-backend-5q60.onrender.com/api/v1/";

  // ✅ GET ORDERS
  useEffect(() => {
    if (!currentUser?._id) return;

    axios
      .get(`${BASE_URL}/api/v1/user/order/${currentUser._id}`)
      .then((res) => {
        console.log("Orders:", res.data);
        setOrders(res.data.orders || []);
      })
      .catch((err) => console.log("Order Error:", err));
  }, [currentUser]);

  // ✅ GET CART
  useEffect(() => {
    if (!currentUser?._id) return;

    axios
      .get(`${BASE_URL}/api/v1/user/cart/${currentUser._id}`)
      .then((res) => {
        console.log("Cart:", res.data);
        setCart(res.data.cart || []);
      })
      .catch((err) => console.log("Cart Error:", err));
  }, [currentUser]);

  // ✅ WISHLIST (localStorage safe)
  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(savedWishlist);
    } catch (e) {
      setWishlist([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-6">

      {/* PROFILE */}
      <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">

        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-pink-500">

          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-pink-100 flex items-center justify-center">
              <FaUser className="text-6xl text-pink-500" />
            </div>
          )}

        </div>

        <div className="flex flex-col gap-3">

          <h1 className="text-4xl font-bold">
            {currentUser?.name || "Guest User"}
          </h1>

          <h2 className="text-xl text-gray-500">
            {currentUser?.email || "No Email"}
          </h2>

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        <div className="bg-white p-8 rounded-2xl shadow-xl flex justify-between">
          <div>
            <h2>Cart Items</h2>
            <h1 className="text-4xl font-bold text-blue-500">{cart.length}</h1>
          </div>
          <FaShoppingCart className="text-6xl text-blue-500" />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl flex justify-between">
          <div>
            <h2>My Orders</h2>
            <h1 className="text-4xl font-bold text-green-500">{orders.length}</h1>
          </div>
          <FaBoxOpen className="text-6xl text-green-500" />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl flex justify-between">
          <div>
            <h2>Wishlist</h2>
            <h1 className="text-4xl font-bold text-red-500">{wishlist.length}</h1>
          </div>
          <FaHeart className="text-6xl text-red-500" />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;