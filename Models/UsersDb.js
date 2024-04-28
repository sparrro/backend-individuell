const Datastore = require("nedb-promise");
const uuid = require("uuid-random")

const usersDb = new Datastore({
    filename: "./Databases/users.db",
    autoload: true
})

const saveUser = (username, password, email) => {
    usersDb.insert({
        username:username,
        email:email,
        password:password,
        id: uuid()
    })
}

const findByUsername = async (username) => {
    return await usersDb.findOne({username:username})
}


module.exports = {saveUser, findByUsername}