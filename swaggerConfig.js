const swaggerJsdoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swingnotes api",
            version: "1.0",
            description: "A rest api for school",
        },
    },
    apis: ["./Routes/*.js"]
}

const specs = swaggerJsdoc(options);
module.exports = specs;

console.log(specs)