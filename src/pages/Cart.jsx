import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] =
    useState([]);

  const userId =
    "6a058bdc0292ed12bc7a5397";

  const API =
    "https://e-commerce-backend-5q60.onrender.com/api/v1/user/cart";

  // =========================
  // GET CART
  // =========================
  const getCartItems = async () => {
    try {
      const res = await axios.get(
        `${API}/${userId}`,
      );

      setCartItems(
        res.data.items || [],
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // INCREASE
  // =========================
  const increaseQuantity = async (
    productId,
  ) => {
    await axios.post(
      `${API}/add`,
      {
        userId,
        productId,
        quantity: 1,
      },
    );

    getCartItems();
  };

  // =========================
  // DECREASE
  // =========================
  const decreaseQuantity = async (
    item,
  ) => {
    if (item.quantity > 1) {
      await axios.post(
        `${API}/add`,
        {
          userId,
          productId:
            item.productId._id,
          quantity: -1,
        },
      );
    } else {
      await axios.delete(
        `${API}/remove`,
        {
          data: {
            userId,
            productId:
              item.productId._id,
          },
        },
      );
    }

    getCartItems();
  };

  // =========================
  // REMOVE
  // =========================
  const removeItem = async (
    productId,
  ) => {
    await axios.delete(
      `${API}/remove`,
      {
        data: {
          userId,
          productId,
        },
      },
    );

    getCartItems();
  };

  // TOTAL PRICE
  const totalCartPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      item.productId.price *
        item.quantity,
    0,
  );

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl">
          Cart is empty
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl p-6 mb-5 flex flex-col md:flex-row gap-6"
            >
              {/* IMAGE */}
              <img
                src={
                  item.productId
                    .image
                }
                className="w-40 h-40 object-cover rounded-lg"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">
                  {
                    item.productId
                      .title
                  }
                </h2>

                <p className="text-gray-600 mt-2">
                  {
                    item.productId
                      .description
                  }
                </p>

                {/* PRICE */}
                <p className="text-xl font-bold text-green-600 mt-2">
                  ₹
                  {
                    item.productId
                      .price
                  }
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item,
                      )
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.productId
                          ._id,
                      )
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* TOTAL + REMOVE */}
              <div className="text-right flex flex-col justify-between">
                <p className="text-2xl font-bold text-orange-500">
                  ₹
                  {item.productId
                    .price *
                    item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeItem(
                      item.productId
                        ._id,
                    )
                  }
                  className="text-red-500 font-semibold mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* SUMMARY */}
          <div className="mt-10 p-6 bg-gray-100 rounded-xl">
            <h2 className="text-3xl font-bold">
              Total: ₹
              {totalCartPrice}
            </h2>

            <Link
              to="/checkout"
              className="block mt-5 bg-black text-white text-center py-3 rounded-lg"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;