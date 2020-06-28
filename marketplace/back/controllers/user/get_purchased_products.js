require("dotenv").config();

const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function getAcquiredProducts(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const [respuesta] = await connection.query(
      `SELECT p.pk_id, p.price, p.address, p.purchase_date
      FROM transactions p INNER JOIN product a ON a.pk_id = p.id_product
      WHERE p.id_user=?
      ORDER BY p.purchase_date`,
      [id]
    );

    if (!respuesta.length) {
      throw generateError("No has comprado ningún producto", 401);
    }
    const purchasedProducts = respuesta;

    res.send({
      status: "ok",
      data: purchasedProducts,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = {
  getAcquiredProducts,
};
