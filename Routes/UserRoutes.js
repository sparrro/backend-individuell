const express = require("express");
const router = express.Router();
const {saveUser, findByUsername} = require("../Models/UsersDb")
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../Utils/bcryptUtils");
const validator = require("email-validator")

router.post("/signup", async (req, res) => {

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(406).json({ message:"All fields must be filled in" })
    }

    if (username.length > 10) {
        return res.status(406).json({message: "Username cannot exceed ten characters"})
    }

    if (!validator.validate(email)) {
        return res.status(406).json({message: "Invalid email"})
    }

    // se om användarnamnet redan finns i databasen
    if (await findByUsername(username)) {
        return res.status(403).json({message:"Username already in use"})
    }

    // kryptera lösenordet
    const encryptedPassword = await hashPassword(password)

    try {

        saveUser(username, encryptedPassword, email)

        return res.status(200).json({ message: "User created" })

    } catch (error) {
        return res.status(500).json({ message: "Failed to create account", error: error })
    }
})

router.post("/login", async (req, res) => {

    //ta in andändarnamn + lösenord
    const {username, password} = req.body;

    //hitta användaren efter användarnamnet i databasen
    const user = await findByUsername(username);

    //kolla att lösenordet stämmer
    let passwordMatches = false
    if (user) {
        passwordMatches = await comparePassword(password, user.password)
    }

    //skicka tillbak ett token
    if (passwordMatches) {
        try {

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: "30min"
            })

            return res.status(200).json({message: "Logged in succesfully", token: token})

        } catch (error) {
            return res.status(500).json({message: "Failed to log in", error: error})
        }
    } else {
        return res.status(403).json({message: "Incorrect login credentials"})
    }

})

module.exports = router