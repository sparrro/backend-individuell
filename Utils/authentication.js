const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "1234"

const authenticate = (req, res, next) => {

    const authorisation = req.header("authorization");
    const token = authorisation && authorisation.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "No valid token provided"})
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({message: "Token invalid"})
        }
        req.user = user;
        next()
    })
}

module.exports = {authenticate}