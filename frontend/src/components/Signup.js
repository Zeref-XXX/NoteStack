import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Header from './Header';

const API_BASE_URL = process.env.BACKEND; // Changed to HTTP

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Send OTP
  const sendOTP = async () => {
    const { name, rollNo, password, confirmPassword } = signupInfo;
    
    if (!name || !rollNo || !password || !confirmPassword) {
      return handleError("All fields are required before sending OTP");
    }
    if (password !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, password })
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        setOtpSent(true);
        handleSuccess("OTP sent successfully");
      } else {
        handleError(result.message || "Failed to send OTP");
      }
    } catch (err) {
      handleError("Error sending OTP. Check your connection.");
      console.error("Send OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    const { rollNo, otp } = signupInfo;
    if (!otp) return handleError("Please enter OTP");
    if (otp.length !== 6) return handleError("OTP must be 6 digits");

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          rollNo: rollNo, 
          otp: otp 
        })
      });
      
      const result = await response.json();
      console.log("Verify OTP result:", result);
      
      if (response.ok && result.success) {
        setOtpVerified(true);
        handleSuccess("OTP verified successfully");
      } else {
        handleError(result.message || "Invalid OTP");
      }
    } catch (err) {
      handleError("Error verifying OTP");
      console.error("Verify OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Final Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, rollNo, password, confirmPassword } = signupInfo;

    if (!name || !rollNo || !password || !confirmPassword) {
      return handleError("All fields are required");
    }
    if (password !== confirmPassword) {
      return handleError("Passwords do not match");
    }
    if (!otpVerified) {
      return handleError("Please verify your OTP first");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, password })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess(result.message || "Signup successful");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(result.message || "Signup failed");
      }
    } catch (err) {
      handleError("Error during signup");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 min-h-[520px]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

          <div className="flex mb-6">
            <Link 
              to="/login" 
              className="flex-1 text-center py-2 bg-gray-100 rounded-l-xl hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <button className="flex-1 py-2 rounded-r-xl text-white bg-blue-700 font-semibold cursor-default">
              Signup
            </button>
          </div>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.name}
                disabled={otpSent || loading}
                required
              />
            </div>

            {/* Roll No */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
              <input
                onChange={handleChange}
                name="rollNo"
                type="text"
                placeholder="Enter your Roll No"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.rollNo}
                disabled={otpSent || loading}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.password}
                disabled={otpSent || loading}
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupInfo.confirmPassword}
                disabled={otpSent || loading}
                required
              />
            </div>

            {/* OTP */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">OTP Verification</label>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={signupInfo.otp}
                  disabled={!otpSent || otpVerified || loading}
                  maxLength={6}
                  pattern="\d{6}"
                  required
                />
                <button
                  type="button"
                  onClick={otpSent ? verifyOTP : sendOTP}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[100px]"
                  disabled={loading || otpVerified}
                >
                  {loading ? "..." : otpSent ? (otpVerified ? "Verified" : "Verify OTP") : "Send OTP"}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-2 px-4 w-full rounded-lg hover:from-blue-800 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
              disabled={!otpVerified || loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}