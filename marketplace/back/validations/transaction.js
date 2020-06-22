const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const newPresentationSchema = Joi.object().keys({
  title: Joi.string()
    .alphanum()
    .max(150)
    .required()
    .error(new Error("Maximum types per field is 150")),
  presentation_event: Joi.string()
    .alphanum()
    .max(150)
    .required()
    .error(new Error("Maximum types per field is 150")),
  presentation_date: Joi.date()
    .format("YYYY-MM-DD")
    .utc()
    .required()
    .error(new Error("Date is wrong")),
  city: Joi.string()
    .max(100)
    .required()
    .error(new Error("El campo debe tener un máximo de 100 caracteres")),
  category: Joi.string()
    .max(100)
    .required()
    .error(new Error("El campo debe tener un máximo de 100 caracteres")),
  language: Joi.string()
    .max(100)
    .required()
    .error(new Error("El campo debe tener un máximo de 100 caracteres")),
});
module.exports = { newPresentationSchema };
