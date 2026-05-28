import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaHeart
} from "react-icons/fa";

function Profile() {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    const storedOrders = localStorage.getItem("orders");
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
    alert("Profile Updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setEditMode(false);
  };

  return (

    <div className="min-h-screen bg-pink-50 p-6 flex flex-col lg:flex-row gap-8">

      {/* ================= LEFT PROFILE ================= */}
      <div className="lg:w-1/3 w-full bg-white p-6 rounded-2xl shadow-xl">

        <div className="flex flex-col items-center">

          <FaUser className="text-6xl text-pink-500 mb-4" />

          {!user ? (

            <p>No user logged in</p>

          ) : (

            <>

              <input
                className="w-full p-2 border mb-3"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!editMode}
              />

              <input
                className="w-full p-2 border mb-3"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!editMode}
              />

              <input
                className="w-full p-2 border mb-3"
                name="password"
                value={user.password}
                onChange={handleChange}
                disabled={!editMode}
              />

              <div className="flex gap-3 mt-3">

                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={saveProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>

              </div>

            </>

          )}

        </div>

      </div>

      {/* ================= RIGHT DASHBOARD ================= */}
      <div className="lg:w-2/3 w-full flex flex-col gap-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
            <div>
              <p>Cart</p>
              <h1 className="text-3xl font-bold text-blue-500">{cart.length}</h1>
            </div>
            <FaShoppingCart className="text-5xl text-blue-500" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
            <div>
              <p>Orders</p>
              <h1 className="text-3xl font-bold text-green-500">{orders.length}</h1>
            </div>
            <FaBoxOpen className="text-5xl text-green-500" />
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
            <div>
              <p>Wishlist</p>
              <h1 className="text-3xl font-bold text-red-500">{wishlist.length}</h1>
            </div>
            <FaHeart className="text-5xl text-red-500" />
          </div>

        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">

              {orders.map((item, i) => (

                <div key={i} className="bg-pink-50 rounded-xl overflow-hidden">

                  <img
                    src={item.image}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-3">

                    <h3 className="font-bold">{item.details}</h3>
                    <p className="text-pink-600 font-bold">₹{item.price}</p>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>

  );
}

export default Profile;