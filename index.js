require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-docs.json");


app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/notes", require("./Routes/NotesRoutes"));


const server = app.listen(process.env.PORT, process.env.BASE_URL, () => {
    console.log(`Server running at http://${process.env.BASE_URL}:${process.env.PORT}...`)
})