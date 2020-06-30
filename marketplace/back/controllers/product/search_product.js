require("dotenv").config();

const { getConnection } = require("../../db");
const { generateError, searchProducts } = require("../../helpers");

async function search(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { query, params } = searchProducts(req.query);

    const [result] = await connection.query(query, params);
    if (!result.length) {
      throw generateError(`There are no matches`, 404);
    }
    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { search };
