const express = require("express");
const router = express.Router();
const { Manufucturer, validate } = require("../models/manufucturer");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectIds");
const admin = require("../middleware/admin");

router.get("/", auth, async (req, res) => {
  const manufucturer = await Manufucturer.find().select("-__v").sort("name");

  res.send(manufucturer);
});

router.get(":/id", auth, async (req, res) => {
  const manufucturer = await Manufucturer.findOne({
    _id: req.params.id,
  }).select("-__v");

  res.send(manufucturer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let manufucturer = await Manufucturer.findOne({
    name: req.body.name,
  });

  if (manufucturer)
    return res.status(400).send("Manufucturer with name alreasy exists");

  manufucturer = new Manufucturer({
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    website: req.body.website,
    contacts: req.body.contacts,
    email: req.body.email,
  });

  manufucturer = await manufucturer.save();

  res.send(manufucturer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let payload = {};

  const keys = Object.keys(req.body);

  let i;
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    payload[key] = req.body[key];
  }

  const manufucturer = await Manufucturer.findByIdAndUpdate(
    req.params.id,
    payload,
    {
      new: true,
    }
  );

  res.send(manufucturer);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const manufucturer = await Manufucturer.deleteOne({ _id: req.params.id });

  if (!manufucturer)
    return res.status(404).send("Manufucturer does not exsit.");

  res.send(manufucturer);
});

module.exports = router;
