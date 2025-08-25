const { userModel } = require("../models/user");
const becrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');
const SendMail = require('../Actions/mail');

// OTP Store with expiration
const otpStore = new Map();

// Clean up expired OTPs periodically
const cleanupExpiredOtps = () => {
  const now = Date.now();
  for (const [email, otpData] of otpStore.entries()) {
    if (now > otpData.expiresAt) {
      otpStore.delete(email);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredOtps, 5 * 60 * 1000);

const sendOtp = async (req, res) => {
  try {
    const { rollNo, name, password } = req.body;
    
    // Input validation
    if (!rollNo || !name || !password) {
      return res.status(400).json({ 
        message: "All fields are required", 
        success: false 
      });
    }

    const email = rollNo + "@nitjsr.ac.in";
    const user = await userModel.findOne({ email });
    
    if (user) {
      return res.status(409).json({ 
        message: "User already exists. Please login", 
        success: false 
      });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      await SendMail(verificationCode, email);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return res.status(500).json({ 
        message: "Failed to send OTP email", 
        success: false 
      });
    }

    // Store OTP with expiration time (10 minutes)
    const otpData = {
      verificationCode,
      name,
      rollNo,
      password,
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    otpStore.set(email, otpData);

    return res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully" 
    });
  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      success: false 
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { rollNo, otp } = req.body;
    
    // Input validation
    if (!rollNo || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Roll number and OTP are required" 
      });
    }

    const email = rollNo + "@nitjsr.ac.in";
    const userData = otpStore.get(email);
    
    if (!userData) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP not sent or expired" 
      });
    }

    // Check if OTP has expired
    if (Date.now() > userData.expiresAt) {
      otpStore.delete(email); // Clean up expired OTP
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired. Please request a new one." 
      });
    }

    if (userData.verificationCode !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP" 
      });
    }

    // Mark OTP as verified
    userData.verified = true;
    userData.verifiedAt = Date.now();
    otpStore.set(email, userData);

    return res.status(200).json({ 
      success: true, 
      message: "OTP verified successfully" 
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

const signup = async (req, res) => {
  try {
    const { rollNo } = req.body;
    const email = rollNo + "@nitjsr.ac.in";

    // Get OTP data from store
    const otpData = otpStore.get(email);
    
    // Check if OTP was verified
    if (!otpData || !otpData.verified) {
      return res.status(400).json({ 
        success: false, 
        message: "OTP not verified. Please verify OTP first." 
      });
    }

    // Check if OTP verification is still valid (e.g., within 5 minutes)
    if (Date.now() > otpData.verifiedAt + 5 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ 
        success: false, 
        message: "OTP verification expired. Please verify again." 
      });
    }

    // Check if user already exists (double check)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists, please login" 
      });
    }

    // Hash password and create user
    const hashedPassword = await becrypt.hash(otpData.password, 10);

    const newUser = new userModel({
      name: otpData.name,
      rollNo: otpData.rollNo,
      email: email,
      password: hashedPassword
    });

    await newUser.save();

    // Remove OTP data after successful signup
    otpStore.delete(email);

    return res.status(201).json({ 
      success: true, 
      message: "Signup successful" 
    });
  } catch (err) {
    console.error("Signup error:", err);
    
    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists" 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

// LOGIN FUNCTION - UNCHANGED AS REQUESTED
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ 
        message: "User not found", 
        success: false 
      });
    }

    const isPassEqual = await becrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ 
        message: "Password not matched", 
        success: false 
      });
    }

    const token = jwtToken.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_Secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: "Login success", 
      success: true, 
      name: user.name, 
      email, 
      token, 
      id: user._id 
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
}

const data = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await userModel.findById(userId);

    res.status(200).json({
      data
    });
  } catch (err) {
    console.error("Data error:", err);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
}

module.exports = { signup, login, data, verifyOtp, sendOtp }