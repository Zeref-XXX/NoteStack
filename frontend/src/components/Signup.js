import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Header from './Header';



const API_BASE_URL = process.env.BACKEND;

const furl = `${API_BASE_URL}/auth/signup`;

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }

    try {
      const url = furl;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details)
      } else if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 min-h-[520px]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>

          <div className="flex mb-6">
            <Link
              to="/login"
              className="flex-1 text-center py-2 bg-gray-100 rounded-l-xl hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <button className="flex-1 py-2 rounded-r-xl text-white bg-blue-700 font-semibold">
              Signup
            </button>
          </div>

          <form onSubmit={handleSignup}>
            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-400"
                value={signupInfo.name}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@domain.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-400"
                value={signupInfo.email}
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-400"
                value={signupInfo.password}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-2 px-4 w-full rounded-lg hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}
