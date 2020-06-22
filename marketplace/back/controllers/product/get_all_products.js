require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.query(
      `SELECT pk_id, 
        name,
        category,
        description,
        price,
        creation_date,
        modification_date
        FROM product
        ORDER BY creation_date`
    );

    const [productsData] = result;

    if (!productsData.length) {
      throw generateError('This page is empty.', 401);
    }

    res.send({
      staus: 'ok',
      data: productsData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getAllProducts };
