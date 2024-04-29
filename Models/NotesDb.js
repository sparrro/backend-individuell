const Datastore = require("nedb-promise");
const uuid = require("uuid-random");
const {findById} = require("./UsersDb")

const notesDb = new Datastore({
    filename: "./Databases/notes.db",
    autoload: true
})

const addNote = async (title, text, user) => {
    
    const currentTime = new Date();
    const note = {
        title: title,
        text: text,
        id: uuid(),
        createdAt: currentTime,
        modifiedAt: currentTime,
        user: user
    }
    await notesDb.insert(note)
}

const deleteNote = async (id) => {
    await notesDb.remove({id: id}, {})
}

const findNote = async (noteId) => {
    return await notesDb.findOne({id: noteId})
}

module.exports = {addNote, deleteNote, findNote}