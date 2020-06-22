require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function productData(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT pk_id , creation_date, name, category,
      description, price FROM product WHERE pk_id=?`,
      [id]
    );
    if (!result.length) {
      throw generateError(
        `There is not product listed in the database with this id: ${id}.`,
        404
      );
    }
    const [productData] = result;
    const payload = {
      creation_date: productData.creation_date,
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: productData.price
    };
    if (productData.pk_id === req.auth.id || req.auth.role === 'admin') {
      payload.id = productData.user_id;
    }
    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { productData };
