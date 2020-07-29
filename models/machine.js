const mongoose = require("mongoose");
const Joi = require("joi");

const optionSchema = new mongoose.Schema({
  name: String,
  price: Number,
  weight: Number,
  power: Number,
  material: String,
  isSecondHand: Boolean,
  warranty: Number,
});

const machineSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  link: String,
  category: {
    type: [String],
    enum: [
      "Construction",
      "Agriculture and Farming",
      "Mining",
      "Fishig",
      "Packaging and Processing",
      "Manufucturing",
      "Accessories",
    ],
  },
  manufucturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufucturer",
  },
  minimumQuantity: Number,
  options: [optionSchema],
});

const Machine = mongoose.model("Machine", machineSchema);

function validateMachine(machine) {
  const nestedSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    weight: Joi.number(),
    power: Joi.number(),
    material: Joi.string(),
    isSecondHand: Joi.boolean(),
    warranty: Joi.number(),
  });
  const schema = {
    title: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    description: Joi.string(),
    manufucturer: Joi.objectId(),
    minimumQuantity: Joi.number(),
    options: Joi.array().items(nestedSchema),
    category: Joi.string().required(),
    link: Joi.string(),
  };

  return Joi.validate(machine, schema);
}

exports.Machine = Machine;
exports.validate = validateMachine;
