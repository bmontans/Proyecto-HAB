const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

// NECESITO ARREGLAR EL CÓDIGO //

const buyProductSchema = Joi.object().keys({
  product: Joi.string()
    .max(50)
    .min(2)
    .error(generateError('Field must have between 2 and 50 characters')),

  description: Joi.string()
    .max(200)
    .min(2)
    .error(generateError('Field must have between 2 and 200 characters')),

  purchase_date: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(generateError('Purchase_date is incorrect', 400)),

  delivery_date: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(generateError('Delivery date is incorrect', 400))
});
module.exports = { buyProductSchema };
