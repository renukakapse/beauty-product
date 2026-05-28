import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Hero() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // CATEGORY
  const product = [
    { id: 1, image: "/perfume.webp", name: "Perfume" },
    { id: 2, image: "/jellycream.webp", name: "Cream" },
    { id: 3, image: "/police.webp", name: "Police Perfume" },
    { id: 4, image: "/dperfume.webp", name: "Deo Perfume" },
    { id: 5, image: "/sunscreen.webp", name: "Sunscreen" },
  ];


  const brands = [
    { id: 1, image: "/fogg.webp" },
    { id: 2, image: "/cleancare.webp" },
    { id: 3, image: "/cerave.webp" },
    { id: 4, image: "/plix.webp" },
    { id: 5, image: "/ajmal.webp" },
    { id: 6, image: "/swiss.webp" },
  ];

  const shadow = [
    {
      id: 101,
      image: "/201.jpg",
      details: "SWISS BEAUTY Limitless Eyeshadow Palette",
      price: 250,
    },
    {
      id: 102,
      image: "/202.jpg",
      details: "Lakyou Beauty Super Me Eyeshadow Palette",
      price: 300,
    },
    {
      id: 103,
      image: "/203.jpg",
      details: "MINARA Nude Eye Shadow Palette",
      price: 350,
    },
    {
      id: 104,
      image: "/204.jpg",
      details: "Glam21 Cosmetics Eyeshadow Palette",
      price: 400,
    },
    {
      id: 105,
      image: "/205.jpg",
      details: "IMagic Touch Blush Palette",
      price: 450,
    },
  ];

  const productcard = [
    {
      id: 201,
      image: "/301.png",
      details: "LOTUS MAKE - UP Natural Kajal",
      price: 300,
    },
    {
      id: 202,
      image: "/302.jpg",
      details: "SUGAR POP Kajal",
      price: 200,
    },
    {
      id: 203,
      image: "/303.jpg",
      details: "Renee Kohl Kajal",
      price: 350,
    },
    {
      id: 204,
      image: "/304.webp",
      details: "Waterproof Kajal",
      price: 350,
    },
    {
      id: 205,
      image: "/305.jpg",
      details: "Blue Heaven Kajal",
      price: 350,
    },
  ];

  const handleProduct = async (item) => {

    try {

      const response = await axios.post(
        "https://e-commerce-backend-5q60.onrender.com/api/v1/user/product",
        item
      );

      console.log(response.data);

      // SAVE RESPONSE
      setCart((prev) => [...prev, response.data]);

    } catch (error) {

      console.log(error);

    }

    navigate(`/productdetails/${item.id}`);
  };

  return (
    <div className='flex flex-col gap-8 bg-pink-50'>

      {/* VIDEO */}
      <div>
        <video
          className='w-full h-[250px] md:h-[550px] object-cover'
          autoPlay
          loop
          muted
        >
          <source src="/vide.mp4" type="video/mp4" />
        </video>
      </div>

      <section className='px-6'>

        <h1 className='text-center font-bold text-3xl text-gray-700 mb-6'>
          Product Category
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {product.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-3 text-center"
            >

              <img
                src={item.image}
                className='rounded-lg w-full h-32 object-cover'
                alt={item.name}
              />

              <h2 className='mt-2 font-semibold text-gray-700'>
                {item.name}
              </h2>

            </div>

          ))}

        </div>

      </section>



      {/* BRANDS */}
      <section className='px-6'>

        <h1 className='text-center font-bold text-3xl text-gray-700 mb-6'>
          Product Brand
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {brands.map((item) => (

            <div
              key={item.id}
              className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >

              <img
                src={item.image}
                className='w-full h-35 object-contain'
                alt="brand"
              />

            </div>

          ))}

        </div>

      </section>

      {/* EYESHADOW SECTION */}
      <section className="px-6 py-6 bg-pink-100 rounded-xl">

        <h1 className="text-center font-bold text-3xl text-gray-700 mb-8">
          Eyeshadow Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {shadow.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >

              <div className="h-72 overflow-hidden">

                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.details}
                />

              </div>

              <div className="p-4 flex flex-col gap-3">

                <h2 className="font-semibold text-gray-800 text-sm">
                  {item.details}
                </h2>

                <h3 className="text-lg font-bold text-pink-600">
                  ₹{item.price}
                </h3>

                <button
                  onClick={() => handleProduct(item)}
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-300"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* KAJAL SECTION */}
      <section className="px-6 py-6">

        <h1 className="text-center font-bold text-3xl text-gray-700 mb-8">
          Kajal Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {productcard.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >

              <div className="h-72 overflow-hidden">

                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.details}
                />

              </div>

              <div className="p-4 flex flex-col gap-3">

                <h2 className="font-semibold text-gray-800 text-sm">
                  {item.details}
                </h2>

                <h3 className="text-lg font-bold text-pink-600">
                  ₹{item.price}
                </h3>

                <button
                  onClick={() => handleProduct(item)}
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-300"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* GO TO CART */}
      <div className='flex justify-center pb-6'>

        <button
          onClick={() => navigate("/cart")}
          className='bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all duration-300'
        >
          Go To Cart
        </button>

      </div>

      {/* BANNER */}
      <div>

        <img
          className='w-full h-[300px] md:h-[500px] object-cover'
          src='/cossmaticss.jpg'
          alt="banner"
        />

      </div>

    </div>
  )
}

export default Hero