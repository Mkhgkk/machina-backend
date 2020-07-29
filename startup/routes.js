const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const machines = require("../routes/machines");
const manufucturers = require("../routes/manufucturers");
const images = require("../routes/images");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use("/api/machines", machines);
    app.use("/api/manufucturers", manufucturers);
    app.use("/api/images", images);
};
