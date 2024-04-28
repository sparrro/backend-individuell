const Datastore = require("nedb-promise");

const notesDb = new Datastore({
    filename: "./Databases/notes.db",
    autoload: true
})

module.exports = notesDb