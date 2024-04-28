const Datastore = require("nedb-promise");

const usersDb = new Datastore({
    filename: "./Databases/users.db",
    autoload: true
})

module.exports = usersDb