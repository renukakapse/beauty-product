import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  // USER ID
  const userId =
    "6a058bdc0292ed12bc7a5397";

  // API
  const API =
    `https://e-commerce-backend-5q60.onrender.com/api/v1/products/${id}`;

  useEffect(() => {

    fetchSingleProduct();

  }, []);

  // FETCH SINGLE PRODUCT
  const fetchSingleProduct = async () => {

    try {

      setLoading(true);

      const response = await axios.get(API);

      console.log(
        "SINGLE PRODUCT =",
        response.data
      );

      const productData =
        response.data.product ||
        response.data.data ||
        response.data;

      setProduct(productData);

    } catch (error) {

      console.log("ERROR =", error);

    } finally {

      setLoading(false);

    }
  };

  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = async () => {

    try {

      const response =
        await axios.post(
          "https://e-commerce-backend-5q60.onrender.com/api/v1/user/cart/add",
          {
            userId,
            productId: product._id,
            quantity: 1,
          }
        );

      console.log(
        "ADD TO CART =",
        response.data
      );

      alert(
        "Product Added To Cart ✅"
      );

      navigate("/cart");

    } catch (error) {

      console.log(
        "ADD TO CART ERROR =",
        error
      );

      alert(
        "Failed To Add Cart ❌"
      );

    }
  };

  // =========================================
  // BUY NOW
  // =========================================

  const buyNow = async () => {

    try {

      await axios.post(
        "https://e-commerce-backend-5q60.onrender.com/api/v1/user/cart/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        }
      );

      navigate("/checkout");

    } catch (error) {

      console.log(
        "BUY NOW ERROR =",
        error
      );

    }
  };

  // LOADING
  if (loading) {
    

    return (

      <div className="flex justify-center items-center h-screen">

        <h1 className="text-3xl font-bold">
          Loading Product...
        </h1>

      </div>

    );

  }

  // NO PRODUCT
  if (!product) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h1 className="text-3xl font-bold text-red-500">
          Product Not Found ❌
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 bg-black text-white px-5 py-2 rounded-lg"
      >
        Back
      </button>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="p-5 bg-gray-100 flex justify-center items-center">

          <img
            src={
              product.imageUrl ||
              product.image ||
              "https://via.placeholder.com/500"
            }
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-xl"
          />

        </div>

        {/* DETAILS */}
        <div className="p-8 flex flex-col justify-center">

          {/* NAME */}
          <h1 className="text-5xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-6 text-lg leading-8">
            {product.description}
          </p>

          {/* PRICE */}
          <h2 className="text-5xl font-bold text-green-600 mt-8">
            ₹ {product.price}
          </h2>

          {/* CATEGORY */}
          <p className="mt-5 text-lg">
            <span className="font-bold">
              Category :
            </span>{" "}
            {product.category}
          </p>

          {/* STOCK */}
          <p className="mt-3 text-lg">
            <span className="font-bold">
              Stock :
            </span>{" "}
            {product.stock}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            {/* ADD TO CART */}
            <button
              onClick={addToCart}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Add To Cart
            </button>

            {/* BUY NOW */}
            <button
              onClick={buyNow}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;