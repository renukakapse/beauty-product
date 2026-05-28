import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  // IMAGE HANDLE

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {

        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));

      };

      reader.readAsDataURL(file);

    }

  };

  // REGISTER API

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "https://e-commerce-backend-5q60.onrender.com/api/v1/user/register",
        formData
      );

      console.log(res.data);


      if (res.data.token) {

        localStorage.setItem(
          "token",
          res.data.token
        );

      }


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user || res.data)
      );

      alert(
        res.data.message ||
        "Registration Successful 👍"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="hidden md:flex flex-col justify-center items-center bg-pink-500 text-white p-10">

          <h1 className="text-5xl font-bold mb-5">
            Welcome 💖
          </h1>

          <p className="text-lg text-center leading-8">
            Create your beauty account and
            explore amazing cosmetic products
            with exciting offers.
          </p>

          <img
            src="/cossmaticss.jpg"
            alt="Cosmetics"
            className="mt-10 rounded-2xl h-72 object-cover shadow-xl"
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 md:p-12">

          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-5"
          >

            {/* TITLE */}

            <div>

              <h2 className="text-4xl font-bold text-pink-600">
                Register
              </h2>

              <p className="text-gray-500 mt-2">
                Create your new account
              </p>

            </div>

            {/* PROFILE IMAGE */}

            <div className="flex justify-center">

              <img
                src={
                  formData.image
                    ? formData.image
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-300 shadow-lg"
              />

            </div>

            {/* IMAGE INPUT */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full border border-pink-200 p-3 rounded-xl"
              />

            </div>

            {/* FULL NAME */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-200 rounded-xl outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-200 rounded-xl outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full p-4 border border-pink-200 rounded-xl outline-none focus:border-pink-500"
                required
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition duration-300 shadow-lg"
            >

              {
                loading
                  ? "Loading..."
                  : "Create Account"
              }

            </button>

            {/* LOGIN LINK */}

            <p className="text-center text-gray-500 mt-2">

              Already have an account ?

              <Link
                to="/login"
                className="text-pink-600 font-bold ml-2 hover:underline"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;