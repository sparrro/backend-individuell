const Datastore = require("nedb-promise");
const uuid = require("uuid-random");
const {format} = require("date-fns")

const notesDb = new Datastore({
    filename: "./Databases/notes.db",
    autoload: true
})

const addNote = async (title, text, user) => {
    
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm");
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

const changeNote = async (noteId, changeData) => {
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm");
    if (changeData.title && changeData.text) {
        await notesDb.update({id: noteId}, {$set: {title: changeData.title, text: changeData.text, modifiedAt: currentTime}}, {})
    } else if (changeData.title) {
        await notesDb.update({id: noteId}, {$set: {title: changeData.title, modifiedAt: currentTime}}, {})
    } else if (changeData.text) {
        await notesDb.update({id: noteId}, {$set: {text: changeData.text, modifiedAt: currentTime}}, {})
    }
}

const findNotes = async (userId) => {
    return await notesDb.find({user: userId})
}

module.exports = {addNote, deleteNote, findNote, changeNote, findNotes}