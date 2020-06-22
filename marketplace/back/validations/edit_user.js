const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const updateUserSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .max(50)
    .min(2)
    .error(generateError('Field must have between 2 and 50 types')),
  address: Joi.string()
    .alphanum()
    .max(50)
    .min(2)
    .error(generateError('Address must be real')),
  email: Joi.string().email().error(generateError('Email not valid')),
  birthdate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(generateError('Date is wrong'))
});
module.exports = {
  updateUserSchema
};
