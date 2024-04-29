const Datastore = require("nedb-promise");
const uuid = require("uuid-random")

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

module.exports = {addNote}