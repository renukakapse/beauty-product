import { useEffect, useState } from "react";

function About() {

  const [show, setShow] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setShow(true);
    }, 10);

  }, []);

  return (

    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('/bgbeauty.jpg')"
      }}
    >

      {/* DARK OVERLAY */}
      <div className="bg-black/40 min-h-screen">

        {/* TOP MOVING TEXT */}
        <div className="overflow-hidden bg-pink-200 py-4">

          <h1
            className="font-bold text-2xl text-pink-700 whitespace-nowrap"
            style={{
              display: "inline-block",
              transform: show
                ? "translateX(120%)"
                : "translateX(-100%)",
              transition: "transform 18s linear"
            }}
          >
            ✨ Get Free Shipping & Extra Rs.35 Off On Prepaid Orders Above Rs.999 ✨
          </h1>

        </div>

        {/* ABOUT HEADING */}
        <div className="py-10">

          <h1 className="text-center font-bold text-5xl text-white">
            About Us
          </h1>

          <p className="text-center text-pink-100 mt-3 text-lg">
            Affordable Luxury Beauty Products
          </p>

        </div>

        {/* MAIN SECTION */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-8 py-10 items-center">

          {/* IMAGE */}
          <div>

            <img
              src="/cossmaticss.jpg"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover hover:scale-105 transition duration-500"
            />

          </div>

          {/* CONTENT */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl">

            <h1 className="font-bold text-4xl text-pink-600 mb-6">
              Affordable Luxury
            </h1>

            <p className="text-gray-700 leading-8 text-lg">

              It's time to Recode your glam game with Recode Studios!

              Welcome to Recode Studios, where Affordable Luxury
              meets exceptional beauty.

              We're a team of seasoned cosmetic experts passionate
              about driving excellence in the beauty and personal
              care industry.

              With a decade of experience in designing, producing,
              and managing cosmetic products globally, we're dedicated
              to delivering premium quality in every product.

              Our partnerships with top manufacturers in Germany,
              Taiwan, and Thailand ensure excellence and innovation.

              Our mission is to help you unleash your true beauty
              with affordable luxury products.

            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

              <button className="bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-black transition">
                Shop Now
              </button>

              <button className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition">
                Learn More
              </button>

            </div>

          </div>

        </div>

        {/* EXTRA SECTION */}
        <div className="grid md:grid-cols-3 gap-8 px-8 pb-16">

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition">

            <h1 className="text-5xl mb-4">🌿</h1>

            <h2 className="font-bold text-2xl text-gray-700 mb-3">
              Natural Products
            </h2>

            <p className="text-gray-500 leading-7">
              We provide skin-friendly and natural beauty products
              for glowing and healthy skin.
            </p>

          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition">

            <h1 className="text-5xl mb-4">💖</h1>

            <h2 className="font-bold text-2xl text-gray-700 mb-3">
              Trusted Quality
            </h2>

            <p className="text-gray-500 leading-7">
              Our beauty products are tested and trusted by
              thousands of happy customers.
            </p>

          </div>

          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition">

            <h1 className="text-5xl mb-4">🚚</h1>

            <h2 className="font-bold text-2xl text-gray-700 mb-3">
              Fast Delivery
            </h2>

            <p className="text-gray-500 leading-7">
              Get your favorite cosmetic products delivered
              quickly and safely at your doorstep.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;