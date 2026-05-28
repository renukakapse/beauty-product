import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const userId = "6a058bdc0292ed12bc7a5397";

  const API =
    "https://e-commerce-backend-5q60.onrender.com/api/v1/user/order";

  // TOTAL PRICE (SAFE)
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!fullName || !email || !address || !city) {
      alert("Please fill all details.");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/checkout`,
        {
          userId,
          shippingAddress: `${address}, ${city}`,
        }
      );

      console.log("ORDER SUCCESS:", response.data);

      clearCart();

      alert("Order placed successfully!");

      navigate("/order-success");
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );

      alert("Failed to place order.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* SHIPPING FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="w-full p-3 border rounded-lg"
            />

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-yellow-400 py-3 rounded-lg font-bold"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    {/* PRODUCT NAME */}
                    <h3 className="font-semibold">
                      {item.productId?.title ||
                        "Product"}
                    </h3>

                    {/* QTY */}
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* PRICE */}
                  <p className="font-bold">
                    ₹
                    {(item.productId?.price || 0) *
                      item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* TOTAL */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-3xl font-bold">
              Total: ₹{totalAmount}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;