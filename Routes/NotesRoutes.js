const express = require("express");
const router = express.Router();
const {addNote, deleteNote, findNote} = require("../Models/NotesDb");
const {authenticate} = require("../Utils/authentication")
const {findById} = require("../Models/UsersDb")


// GET för att hämta anteckningar --EJ FÄRDIG
router.get("/", authenticate, async (req, res) => {
    
    console.log(req.user)
    const user = await findById(req.user.id);
    console.log(user)
    return res.status(200).json({message: "sluta tugga"})

});

// POST för att spara en anteckning --VERKAR FUNKA
router.post("/", authenticate, async (req, res) => {
    const userId = req.user.id;
    const {title, text} = req.body;
    try {
        await addNote(title, text, userId);
        return res.status(200).json({message: "Note added"})
    } catch (error) {
        return res.status(500).json({message: "Failed to add note", error: error})
    }
});

// PUT för att ändra en anteckning --EJ PÅBÖRJAD
router.put("/", authenticate, async (req, res) => {

});

// DELETE för att radera en anteckning --VERKAR FUNKA
router.delete("/:noteId", authenticate, async (req, res) => {
    const user = req.user.id;
    const noteId = req.params.noteId;
    const note = await findNote(noteId)

    if (user != note.user) {
        return res.status(403).json({message: "That's not your note mf"})
    }
    
    try {
        deleteNote(noteId);
        return res.status(200).json({message: "Note deleted"})
    } catch (error) {
        return res.status(500).json({message: "Failed to delete note", error: error})
    }
    
});

module.exports = router