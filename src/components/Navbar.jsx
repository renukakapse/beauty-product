import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);

  const userId = "6a058bdc0292ed12bc7a5397";

  const API =
    "https://e-commerce-backend-5q60.onrender.com/api/v1/user/cart";

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${API}/${userId}`);

      const items = response.data.items || [];

      const total = items.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      setCartCount(total);
    } catch (error) {
      console.log("CART COUNT ERROR", error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // 🔥 Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      
      {/* LOGO */}
      <h1 className="capitalize text-3xl font-bold text-pink-500">
        Natural/Organic
      </h1>

      <ul className="flex items-center gap-6 text-pink-400 font-semibold">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/product">Product</Link></li>

        {/* CART */}
        <div className="relative">
          <button
            onClick={() => navigate("/cart")}
            className="text-3xl hover:scale-110 transition"
          >
            🛒
          </button>

          <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="text-3xl"
          >
            🙍‍♂️
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-4 w-52 bg-white shadow-xl rounded-xl overflow-hidden border">
              <Link className="block px-5 py-3 hover:bg-pink-100" to="/register">
                Register
              </Link>

              <Link className="block px-5 py-3 hover:bg-pink-100" to="/login">
                Login
              </Link>

              <Link className="block px-5 py-3 hover:bg-pink-100" to="/profile">
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-3 hover:bg-pink-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navbar;