const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const passwordSchema = Joi.string()
  .min(6)
  .alphanum()
  .max(150)
  .required()
  .error(generateError('Field must have between 6 and 50 types'));

const newUserSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .max(50)
    .min(2)
    .required()
    .error(generateError('Field must have between 2 and 50 types')),
  address: Joi.string()
    .alphanum()
    .max(50)
    .min(2)
    .required()
    .error(generateError('Address must be real')),
  email: Joi.string()
    .email()
    .required()
    .error(generateError('Email not valid')),
  birthdate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(generateError('Date is wrong')),
  password: passwordSchema
});
module.exports = {
  newUserSchema,
  passwordSchema
};
