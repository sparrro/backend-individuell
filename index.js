require("dotenv").config();

const express = require("express");
const app = express();


app.use(express.json());

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/notes", require("./Routes/NotesRoutes"));

const server = app.listen(process.env.PORT, process.env.BASE_URL, () => {
    console.log(`Server running at http://${process.env.BASE_URL}:${process.env.PORT}...`)
})