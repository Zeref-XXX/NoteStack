const { signup, login ,data,sendOtp,verifyOtp} = require('../controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();
 
router.options("/send-otp", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://note-stack-front.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res.sendStatus(200);
});

router.post('/signup', signup)
router.post('/login', loginValidation, login)
router.post('/user', data)
router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);



module.exports = router