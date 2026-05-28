import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [ordersList, setOrdersList] = useState([]);

  const userId = "6a058bdc0292ed12bc7a5397";

  const API =
    "https://e-commerce-backend-5q60.onrender.com/api/v1/user/order";

  // =========================
  // GET ORDERS
  // =========================
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${API}/${userId}`
      );

      console.log("ORDERS:", response.data);

      setOrdersList(
        response.data.orders ||
          response.data.data ||
          []
      );
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Orders
      </h1>

      {ordersList.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-6">
            No orders placed yet.
          </p>

          <Link
            to="/shop"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {ordersList.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{index + 1}
                  </h2>

                  <p className="text-gray-500">
                    Date:{" "}
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString()
                      : "N/A"}
                  </p>

                  <p className="text-gray-500">
                    Status:{" "}
                    {order.status || "Processing"}
                  </p>
                </div>

                <p className="text-green-600 font-bold">
                  Placed
                </p>
              </div>

              {/* SHIPPING */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <p>
                  <span className="font-semibold">
                    Shipping:
                  </span>{" "}
                  {order.shippingAddress || "N/A"}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.productId?.title ||
                          item.title}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-lg">
                      ₹
                      {(item.price ||
                        item.productId?.price ||
                        0) *
                        item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL (FIXED) */}
              <div className="flex justify-between mt-6 pt-4 border-t">
                <p className="text-2xl font-bold">
                  Total:
                </p>

                <p className="text-2xl font-bold text-yellow-500">
                  ₹
                  {order.totalAmount ||
                    order.total ||
                    order.amount ||
                    order.items?.reduce(
                      (sum, item) =>
                        sum +
                        (item.price ||
                          item.productId
                            ?.price ||
                          0) *
                          item.quantity,
                      0
                    )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;