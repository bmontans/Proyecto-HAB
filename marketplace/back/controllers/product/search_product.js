require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function searchProduct(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { text } = req.query;

    const result = await connection.query(
      `SELECT name, category, description , price 
  FROM product WHERE name LIKE ? OR description LIKE ? 
  ORDER BY name`,
      [`%${text}%`, `%${text}%`]
    );

    const [articulos] = result;
    if (!articulos.length) {
      throw generateError('There are no products listed', 401);
    }

    res.send({
      staus: 'ok',
      data: articulos
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { searchProduct };
