const { signup, login ,data,sendOtp,verifyOtp} = require('../controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();
 


router.post('/signup', signup)
router.post('/login', loginValidation, login)
router.post('/user', data)
router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);



module.exports = router