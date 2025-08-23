const {userModel}= require("../models/user");
const becrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken');
const SendMail = require('../Actions/mail');
const { send } = require("process");

// const signup = async (req, res) => {
//     try {
//          const { rollNo, name,password } = req.body;
//          const email= rollNo + "@nitjsr.ac.in";
//          console.log(name);
//         const user = await userModel.findOne({ email });
//         if (user) {
//             return res.status(409).json({ message: "user already exist LOGIN", success: false })
//         }

//         const verificationCode = Math.floor(Math.random() * 10000 + 100000).toString();     
//         SendMail(verificationCode,email);

//         const newUser = new userModel({
//             name,
//             email,
//             password,
//             verificationCode
//         })
        
//         newUser.password = await becrypt.hash(password, 10) //salt =10
//         await newUser.save();

//         res.status(201).json({
//              success: true,
//              message: "Resource created successfully",
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server erroR ", success: false, err })
//     }
// }

const signup = async (req, res) => {
  try {

    const { rollNo, name, password } = req.body;
    if (!rollNo || !name || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const email = rollNo + "@nitjsr.ac.in";
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists, please login" });
    }

    const hashedPassword = await becrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      rollNo,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { rollNo, otp } = req.body;
    const email = rollNo + "@nitjsr.ac.in";

    const userData = otpStore.get(email);
    if (!userData) {
      return res.status(400).json({ success: false, message: "OTP not sent or expired" });
    }

    if (userData.verificationCode !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark OTP as verified
    userData.verified = true;
    otpStore.set(email, userData);

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Server Error", err });
  }
};

const otpStore = new Map(); // temp store (better: Redis or DB)

const sendOtp = async (req, res) => {
  try {
    console.log("inside senotp")
    const { rollNo, name, password } = req.body;
    const email = rollNo + "@nitjsr.ac.in";

    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists. Please login", success: false });
    }

    // Generate OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP mail
    SendMail(verificationCode, email);

    // Store temp data
    otpStore.set(email, { verificationCode, name, rollNo, password });

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", success: false, err });
  }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
      

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "user not found", success: false })
        }

        const isPassEqual = await becrypt.compare(password, user.password);
        if (!isPassEqual) return res.status(403).json({ message: "password not matched ", success: false })

        

        const token = jwtToken.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_Secret,
            { expiresIn: '1h' }
        );
     

        res.status(201).json({ message: "login success", success: true, name: user.name, email, token, id: user._id })

    } catch (err) {
        res.status(500).json({ message: "Internal server erroR ", success: false, err })
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
        res.send(err);
    }
}

module.exports = { signup, login, data,verifyOtp,sendOtp}