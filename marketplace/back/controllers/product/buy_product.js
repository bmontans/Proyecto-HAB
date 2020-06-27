require("dotenv").config();
const { getConnection } = require("../../db");
const { buyProductSchema } = require("../../validations/buy_product");
const {
  generateError,
  formatDateToDB,
  purchaseConfirmation,
} = require("../../helpers");
const { address } = require("faker");

async function buyProduct(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await buyProductSchema.validateAsync(req.body);

    const user_id = req.auth.id;
    const product_id = req.params.id;

    const { address, price } = req.body;

    const [
      current,
    ] = await connection.query(
      "SELECT  name, price, pk_id FROM product where pk_id=?",
      [product_id]
    );

    await connection.query(
      `INSERT INTO transactions (id_product, id_user, price, address, purchase_date, modification_date) 
      VALUES  (?,?,?,?,NOW(),NOW())`,

      [product_id, user_id, price, address]
    );

    res.send({
      status: "ok",
      message: "Purchase completed",
    });

    const [
      userData,
    ] = await connection.query(`SELECT email FROM user WHERE pk_id=?`, [
      user_id,
    ]);

    try {
      await purchaseConfirmation({
        email: userData[0].email,
        title: "Purchase receipt",
        content: `You've purchased ${current[0].name}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("There was an error with your email");
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { buyProduct };
