const express = require("express");
const router = express.Router();
const { Machine, validate } = require("../models/machine");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectIds");
const admin = require("../middleware/admin");

router.get("/", auth, async (req, res) => {
    const machines = await Machine.find()
        .select("-__v")
        .sort("title");

    res.send(machines);
});

router.get(":/id", auth, async (req, res) => {
    const machine = await (await Machine.findOne({ _id: req.params.id })).isSelected("-__v");

    res.send(machine);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let machine = await Machine.findOne({
        title: req.body.title
    });

    if (machine) return res.status(400).send("Machine with name alreasy exists");

    machine = new Machine({
        title: req.body.title,
        imges: req.body.images,
        description: req.body.description,
        link: req.body.link,
        category: req.body.category,
        manufucturer: req.body.manufucturer,
        minimumQuantity: req.body.minimumQuantity,
        options: req.body.options,
    });

    machine = await machine.save();

    res.send(machine);

});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let payload = {};

    const keys = Object.keys(req.body);

    let i;
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        payload[key] = req.body[key];
    }

    const machine = await Machine.findByIdAndUpdate(req.params.id, payload, {
        new: true
    });

    res.send(machine);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
    const machine = await Machine.deleteOne({ _id: req.params.id });

    if (!machine) return res.status(404).send("Machine does not exsit.");

    res.send(machine);
});

module.exports = router;