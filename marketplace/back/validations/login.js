const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const usernameSchema = Joi.string()
  .min(2)
  .max(20)
  .required()
  .error(generateError('Username field must have between 2 and 20 types'));
const passwordSchema = Joi.string()
  .min(6)
  .max(150)
  .required()
  .error(generateError('Field must have between 6 and 50 types'));

const loginSchema = Joi.object().keys({
  username: usernameSchema,
  password: passwordSchema
});
module.exports = {
  loginSchema
};
