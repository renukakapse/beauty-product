import React, { useState } from "react";

function AddProducts() {

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    desc: "",
    org: "",
    price: "",
    discount: "",
  });

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("https://e-commerce-backend-5q60.onrender.com/api/v1/user/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        alert("Product Added Successfully!!!");

        // RESET FORM
        setFormData({
          image: "",
          name: "",
          desc: "",
          org: "",
          price: "",
          discount: "",
        });

      } else {
        alert("Product Add Failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 flex flex-col gap-5"
      >

        <h1 className="text-4xl font-bold text-center text-cyan-500">
          Add Products
        </h1>

        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
          required
        />

        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={formData.desc}
          onChange={(e) =>
            setFormData({
              ...formData,
              desc: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500 h-28 resize-none"
          required
        />

        <input
          type="number"
          placeholder="Original Price"
          value={formData.org}
          onChange={(e) =>
            setFormData({
              ...formData,
              org: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
          required
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
          required
        />

        {/* DISCOUNT */}
        <input
          type="number"
          placeholder="Discount %"
          value={formData.discount}
          onChange={(e) =>
            setFormData({
              ...formData,
              discount: e.target.value,
            })
          }
          className="border border-gray-300 p-3 rounded-xl outline-none focus:border-cyan-500"
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-cyan-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-cyan-600 duration-300"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProducts;