const express = require("express");
const config = require("config");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");

app.use(express.static('public'))
// const server = app.listen(port, () => winston.info(`Listening on port ${port}....`));
const server = app.listen(port, () => console.log(`Listening on port ${port}....`));

module.exports = server;