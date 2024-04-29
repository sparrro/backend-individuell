const express = require("express");
const router = express.Router();
const {addNote} = require("../Models/NotesDb");
const {authenticate} = require("../Middlewares/authentication")
const {findById} = require("../Models/UsersDb")


// GET för att hämta anteckningar --EJ FÄRDIG
router.get("/", authenticate, async (req, res) => {
    
    console.log(req.user)
    const user = await findById(req.user.id);
    console.log(user)
    return res.status(200).json({message: "sluta tugga"})

});

// POST för att spara en anteckning
router.post("/", authenticate, async (req, res) => {
    const userId = req.user.id;
    const {title, text} = req.body;
    await addNote(title, text, userId);
    res.status(200).json({message: "Note added"})
});

// PUT för att ändra en anteckning
router.put("/", authenticate, async (req, res) => {

});

// DELETE för att radera en anteckning
router.delete("/", authenticate, async (req, res) => {

});

module.exports = router