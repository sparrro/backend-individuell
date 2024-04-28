const express = require("express");
const router = express.Router();
const notesDb = require("../Models/NotesDb");


// GET för att hämta anteckningar
router.get("/", async (req, res) => {
    
});

// POST för att spara en anteckning
router.post("/", async (req, res) => {

});

// PUT för att ändra en anteckning
router.put("/", async (req, res) => {

});

// DELETE för att radera en anteckning
router.delete("/", async (req, res) => {

});

module.exports = router