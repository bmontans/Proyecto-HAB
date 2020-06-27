require("dotenv").config();
const { getConnection } = require("../../db");
const { newRatingSchema } = require("../../validations/product_rating");
const { generateError } = require("../../helpers");

async function rateProduct(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await newRatingSchema.validateAsync(req.body);

    const transaction_id = req.params.id;

    const { comment, rating } = req.body;

    const [
      current,
    ] = await connection.query(
      `SELECT id_user, id_product FROM transactions WHERE pk_id=?`,
      [transaction_id]
    );

    if (!current.length) {
      throw generateError("This transaction doesn't exist", 401);
    }

    const [transactionData] = current;

    if (req.auth.id !== transactionData.id_user) {
      throw generateError("You need to log in to rate this product", 401);
    }

    const [
      existingValoration,
    ] = await connection.query(`SELECT pk_id FROM ratings WHERE id_product=?`, [
      transaction_id,
    ]);

    if (existingValoration.length) {
      throw generateError("This product was already rated", 401);
    }

    await connection.query(
      `INSERT INTO ratings (id_product, 
                            id_transaction, 
                            comment, 
                            rating, 
                            creation_date, modification_date)
      VALUES(?,?,?,?,NOW(),NOW())`,
      [transactionData.id_product, transaction_id, comment, rating]
    );

    res.send({
      status: "ok",
      message: "Rating successfully added",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { rateProduct };
