const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization']  // Get the token part


    if (!auth) {
        return res.status(403)
            .json({ message: "Unauthorized access , JWT required " });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_Secret);
        req.user = decoded;

        next();

    } catch (err) {
        console.log("JWT Error:", err.name, "-", err.message);
        return res.status(403).json({ message: "Expired or Invalid JWT Token", error: err.message });

    }
}

module.exports = ensureAuthenticated