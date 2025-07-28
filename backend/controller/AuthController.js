const { userModel } = require("../models/user");
const becrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "user already exist LOGIN", success: false })
        }
        
        const userdb = new userModel({ name, email, password });
     
        userdb.password = await becrypt.hash(password, 10) //salt =10
        await userdb.save();
        res.status(201).json({ message: " Sign Up success", success: true })
    } catch (err) {
        res.status(500).json({ message: "Internal server erroR ", success: false, err })
    }
}

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

module.exports = { signup, login, data }