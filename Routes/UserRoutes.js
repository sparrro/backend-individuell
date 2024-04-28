const express = require("express");
const router = express.Router();
const userDb = require("../Models/UsersDb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.status(200).json({ message:"test(ikel)" })
});

router.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(406).json({ message:"All fields must be filled in" })
    }

    try {

        const user = {
            username: username,
            password: password,
            email: email
        }

        await userDb.insert(user)

        return res.status(200).json({ message: "user created", user: user })

    } catch (error) {
        return res.status(500).json({ message: "Failed to create account", error: error })
    }
})

router.post("/login", async (req, res) => {

})

module.exports = router