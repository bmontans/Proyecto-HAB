const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const { generateError } = require("../helpers");
const { passwordSchema } = require("./login");

const reactivateSchema = Joi.object().keys({
  username: Joi.string()
    .min(2)
    .max(20)
    .required()
    .error(
      generateError("UserName field must have between 2 and 20 types", 400)
    ),
  password: passwordSchema,
});
const passwordRecoverySchema = Joi.object().keys({
  email: Joi.string().email().error(generateError("Email not valid", 400)),
});

module.exports = {
  passwordRecoverySchema,
  reactivateSchema,
};
