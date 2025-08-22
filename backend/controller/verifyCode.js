const {userModel} = require('../models/user');

const verifyCode = async (req, res) => {

    try {
        // console.log("verify")
        // console.log("sent to backend", req.body);
        // console.log("verifying ...")
        let { id, otp } = req.body;
        email = id + "@nitjsr.ac.in";
        // console.log(req.body);106633
        const user = await userModel.findOne({ email });
        // console.log(user);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check expiry before anything else
        if (new Date() > user.expiresAt) {
            return res.status(400).json({ message: "Verification code expired" });
        }

        // Check if code matches
        if (user.verificationCode == otp) {
            // Mark user as verified
            // console.log("matched")
            user.isVerified = true;
            user.verificationCode = undefined; 
            // console.log(user);
            await user.save();
            res.json({ message: "Verification successful" });
        }
        else {
            return res.status(400).json({ message: "Invalid code" });
        }
    } catch (err) {
        console.log("Verification error:", err.message);
        res.status(500).json({ error: "Verification failed" });
    }
};

module.exports = verifyCode;
