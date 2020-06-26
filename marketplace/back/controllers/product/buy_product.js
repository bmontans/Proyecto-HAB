require("dotenv").config();
const { getConnection } = require("../../db");
const { buyProductSchema } = require("../../validations/buy_product");
const {
  generateError,
  formatDateToDB,
  purchaseConfirmation,
} = require("../../helpers");

async function buyProduct(req, res, next) {
  let connection;

  try {
    const id_usuario = req.auth.id;
    const id_articulo = req.params.id;
    connection = await getConnection();
    await buyProductSchema.validateAsync(req.body);

    const { description, rating } = req.body;

    await connection.query(
      `INSERT INTO transactions (id_user, id_product, description, rating, creation_date, modification_date) 
      VALUES  (?,?,?,?,NOW(),NOW())`,

      [id_articulo, id_usuario, description, rating]
    );

    res.send({
      status: "ok",
      message: "Product successfully purchased",
    });

    const [
      userData,
    ] = await connection.query(`SELECT email FROM user WHERE pk_id=?`, [
      user_id,
    ]);

    try {
      await purchaseConfirmation({
        email: userData[0].mail,
        title: "Product purchased",
        content: `Thanks for purchasing ${current[0].name}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("There was an error sending the email");
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
