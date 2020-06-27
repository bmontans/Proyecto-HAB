const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const { generateError } = require("../helpers");

const buyProductSchema = Joi.object().keys({
  address: Joi.string()
    .required()
    .max(50)
    .min(2)
    .error(new Error("La dirección debe tener entre 2 y 50 caracteres")),

  price: Joi.number()
    .required()
    .error(new Error("El precio es incorrecto", 400)),
});
module.exports = { buyProductSchema };
