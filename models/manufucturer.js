const mongoose = require("mongoose");
const Joi = require("joi");

const manufucturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    description: String,
    website: String,
    contacts: [String],
    email: [String]
})

const Manufucturer = mongoose.model("Manufucturer", manufucturerSchema);

function validateManufucturer(manufucturer) {
    const schema = {
        name: Joi.string().required(),
        address: Joi.string(),
        description: Joi.string(),
        website: Joi.string(),
        contacts: Joi.array().items(Joi.string()),
        eamil: Joi.array().items(Joi.string())
    }

    return Joi.validate(manufucturer, schema);
}

exports.Manufucturer = Manufucturer;
exports.validate = validateManufucturer;