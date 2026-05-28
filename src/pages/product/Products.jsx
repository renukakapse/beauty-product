import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // API
  const API =
    "https://e-commerce-backend-5q60.onrender.com/api/v1/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await axios.get(API);

      console.log("API RESPONSE =", response.data);

      let productData = [];

      // HANDLE API DATA
      if (Array.isArray(response.data)) {

        productData = response.data;

      } else if (Array.isArray(response.data.products)) {

        productData = response.data.products;

      } else if (Array.isArray(response.data.data)) {

        productData = response.data.data;

      }

      setProducts(productData);

    } catch (error) {

      console.log("FETCH ERROR =", error);

      setProducts([]);

    } finally {

      setLoading(false);

    }
  };

  // GO TO PRODUCT DETAILS
  const goToDetails = (product) => {

    navigate(`/product/${product._id}`, {
      state: product,
    });

  };

  // LOADING
  if (loading) {

    return (

      <div className="flex justify-center items-center h-screen bg-gray-100">

        <h1 className="text-3xl font-bold">
          Loading Products...
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        All Products
      </h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.length > 0 ? (

          products.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={
                    item.imageUrl ||
                    item.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.name}
                  onClick={() => goToDetails(item)}
                  className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition duration-300"
                />

              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">

                {/* PRODUCT NAME */}
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.name}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-3 line-clamp-2 min-h-[48px]">
                  {item.description}
                </p>

                {/* PRICE */}
                <h3 className="text-3xl font-bold text-green-600 mt-4">
                  ₹ {item.price}
                </h3>

                {/* CATEGORY + STOCK */}
                <div className="flex justify-between mt-3 text-sm text-gray-500">

                  <p>
                    {item.category}
                  </p>

                  <p>
                    Stock : {item.stock}
                  </p>

                </div>

                {/* VIEW DETAILS BUTTON */}
                <div className="mt-auto pt-6">

                  <button
                    onClick={() => goToDetails(item)}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="col-span-full flex justify-center items-center h-[300px]">

            <h1 className="text-3xl font-bold text-red-500">
              No Products Found ❌
            </h1>

          </div>

        )}

      </div>

    </div>

  );
}

export default Products;