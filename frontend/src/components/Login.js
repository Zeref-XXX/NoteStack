import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Header from './Header';



const API_BASE_URL = process.env.BACKEND;
const furl=`${API_BASE_URL}/auth/login`;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }

    try {
      const url = furl;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, token, name,message,error,id } = result;
       

      if (success) {
        handleSuccess(message); 
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("id", id);
        

        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 min-h-[520px]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div className="flex mb-6">
          <button className="flex-1 py-2 rounded-l-xl text-white bg-blue-700 font-semibold">
            Login
          </button>
          <Link
            to="/signup"
            className="flex-1 text-center py-2 bg-gray-100 rounded-r-xl hover:bg-gray-200 transition"
          >
            Signup
          </Link>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
             College Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="ID@nitjsr.ac.in"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-400"
              value={loginInfo.email}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition placeholder-gray-400"
              value={loginInfo.password}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-blue-600 cursor-pointer mb-4 hover:underline">
            Forgot password?
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-2 px-4 w-full rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Re  direct */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
    </>
  );
}
