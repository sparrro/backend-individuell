const express = require("express");
const router = express.Router();
const {addNote, deleteNote, findNote, changeNote, findNotes} = require("../Models/NotesDb");
const {authenticate} = require("../Utils/authentication")


// GET för att hämta anteckningar --VERKAR FUNKA
router.get("/", authenticate, async (req, res) => {
    
    const userId = req.user.id;

    try {
        const userNotes = await findNotes(userId);
        return res.status(200).json({message: "Notes succesfully got", notes: userNotes})
    } catch (error) {
        return res.status(500).json({message: "Failed to get notes", error: error})
    }

});

// POST för att spara en anteckning --VERKAR FUNKA
router.post("/", authenticate, async (req, res) => {
    const userId = req.user.id;
    const {title, text} = req.body;

    if (title.length > 20) {
        return res.status(406).json({message: "Title cannot exceed 20 characters"})
    }

    if (text.lengt > 100) {
        return res.status(406).json({message: "Text cannot exceed 100 characters"})
    }

    try {
        await addNote(title, text, userId);
        return res.status(200).json({message: "Note added"})
    } catch (error) {
        return res.status(500).json({message: "Failed to add note", error: error})
    }
});

// PUT för att ändra en anteckning --VERKAR FUNKA
router.put("/:noteId", authenticate, async (req, res) => {

    const user = req.user.id;

    //hämta den nya datan från body
    const {title, text} = req.body

    if (!title && !text) {
        return res.status(406).json({message: "No updated data provided"})
    }

    //hämta rätt anteckning med id från params; ge fel om anteckningen inte finns
    const noteId = req.params.noteId;
    const note = await findNote(noteId);

    if (!note) {
        return res.status(404).json({message: "Note not found"})
    }

    //dubbelkolla att anteckningen tillhör den inloggade användaren
    if (user != note.user) {
        return res.status(403).json({message: "That's not your note mf"})
    }

    //ändra anteckningen med nya datan
    try {
        const changeData = {title: title, text: text};
        await changeNote(noteId, changeData);
        return res.status(200).json({message: "Note updated"})
    } catch (error) {
        return res.status(500).json({message: "Failed to update note", error: error})
    }

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