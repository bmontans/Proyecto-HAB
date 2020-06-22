require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { editProductSchema } = require('../../validations/edit_product');

async function editProduct(req, res, next) {
  let connection;
  try {
    await editProductSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { name, description, price } = req.body;

    const [
      current
    ] = await connection.query(` SELECT pk_id FROM product WHERE pk_id=?`, [
      id
    ]);
    if (!current.length) {
      throw generateError(
        `The product with this ID (${id}) does not exist`,
        404
      );
    }

    await connection.query(
      ` UPDATE product SET name=?, description=?, price=?  WHERE pk_id=?`,
      [name, description, price, id]
    );
    res.send({ status: 'ok', message: 'Product successfully updated.' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editProduct };
