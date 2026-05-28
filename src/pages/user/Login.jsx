import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // BODY DATA

      const loginData = {
        email: email,
        password: password,
      };

      // API CALL

      const res = await axios.post(
        "https://e-commerce-backend-5q60.onrender.com/api/v1/user/login",
        loginData
      );

      console.log(res.data);

      // TOKEN SAVE

      if (res.data.token) {

        localStorage.setItem(
          "token",
          res.data.token
        );

      }

      // USER SAVE

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user || res.data)
      );

      alert(
        res.data.message ||
        "Login Successful 👍"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Invalid Email or Password"
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
            Welcome Back 💖
          </h1>

          <p className="text-lg text-center leading-8">
            Login to your beauty account and
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
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >

            {/* TITLE */}

            <div>

              <h2 className="text-4xl font-bold text-pink-600">
                Login
              </h2>

              <p className="text-gray-500 mt-2">
                Login to your account
              </p>

            </div>

            {/* EMAIL */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  : "Login"
              }

            </button>

            {/* REGISTER LINK */}

            <p className="text-center text-gray-500 mt-2">

              Don't have an account ?

              <Link
                to="/register"
                className="text-pink-600 font-bold ml-2 hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;