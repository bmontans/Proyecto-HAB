require("dotenv").config();

const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function getUserProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [respuesta] = await connection.query(
      `SELECT  name, category, description, price, pk_id, product_picture FROM product WHERE id_user=?
  ORDER BY creation_date`,
      [id]
    );

    if (!respuesta.length) {
      throw generateError("This user has no products listed", 401);
    }
    const articulos = respuesta;

    res.send({
      status: "ok",
      data: articulos,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getUserProducts,
};
