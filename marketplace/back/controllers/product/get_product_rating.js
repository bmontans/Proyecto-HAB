require("dotenv").config();
const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function getRatingProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const result = await connection.query(
      `SELECT  
        rating,
        comment,
        creation_date FROM ratings WHERE id_product=?
        ORDER BY creation_date`,
      [id]
    );

    const [usersData] = result;

    if (!result.length) {
      throw generateError("There are no valorations", 401);
    }

    res.send({
      status: "ok",
      data: usersData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getRatingProducts };
