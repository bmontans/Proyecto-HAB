const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const { generateError } = require("../helpers");

const buyProductSchema = Joi.object().keys({
  description: Joi.string()
    .max(200)
    .min(2)
    .error(generateError("Field must have between 2 and 200 characters")),
});
module.exports = { buyProductSchema };
