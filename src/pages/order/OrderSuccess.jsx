import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-5xl font-bold text-green-600 mb-4">
        Order Placed Successfully!
      </h1>

      <p className="text-lg text-gray-600 mb-8 text-center">
        Thank you for shopping with us.
      </p>

      <div className="flex gap-4">
        <Link
          to="/orders"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          View Orders
        </Link>

        {/* FIXED HERE */}
        <Link
          to="/"
          className="border border-black px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;