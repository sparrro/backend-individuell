require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-docs.json");


const BASE_URL = process.env.BASE_URL || "127.0.0.1"
const PORT = process.env.PORT || "3000"


app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/notes", require("./Routes/NotesRoutes"));


const server = app.listen(PORT, BASE_URL, () => {
    console.log(`Server running at http://${BASE_URL}:${PORT}...`)
})