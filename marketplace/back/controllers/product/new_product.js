require('dotenv').config();

const { getConnection } = require('../../db');
const { newProductSchema } = require('../../validations/product');
const { generateError } = require('../../helpers');

async function newProduct(req, res, next) {
  let connection;
  try {
    const { id } = req.auth;
    connection = await getConnection();
    await newProductSchema.validateAsync(req.body);

    const { name, category, description, price } = req.body;

    const [
      existingProduct
    ] = await connection.query('SELECT name FROM product WHERE name=?', [name]);
    if (existingProduct.length) {
      throw generateError('The product already exists in the DB', 409);
    }

    await connection.query(
      `INSERT INTO product (id_user, name, category, description, price, creation_date, modification_date)
      VALUES (?,?,?,?,?,NOW(),NOW()) `,
      [id, name, category, description, price]
    );

    res.send({
      status: 'ok',
      message: 'Product posted correctly.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newProduct };
console.log('Viva el JavaScript');
