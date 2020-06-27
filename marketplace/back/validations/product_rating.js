const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const { generateError } = require("../helpers");

const newRatingSchema = Joi.object().keys({
  comment: Joi.string()
    .max(1000)
    .error(generateError("You have exceeded the character limit (1000)", 400)),

  rating: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(new Error("Rating must be a number between 1 and 5")),
});
module.exports = { newRatingSchema };
