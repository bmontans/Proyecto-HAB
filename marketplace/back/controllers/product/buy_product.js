require("dotenv").config();
const { getConnection } = require("../../db");
const {
  generateError,
  formatDateToDB,
  purchaseConfirmation,
} = require("../../helpers");
const { differenceInDays } = require("date-fns");

async function buyProduct(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const user_id = req.auth.id;
    const product_id = req.params.id;

    const [
      current,
    ] = await connection.query(
      "SELECT name, category, description, price, pk_id FROM product where pk_id=?",
      [product_id]
    );

    await connection.query(
      `INSERT INTO transactions (id_product, id_user) 
      VALUES  (?,?)`,

      [user_id, product_id]
    );

    res.send({
      status: "ok",
      message:
        "Tu compra se ha realizado correctamente. En unos momentos recibiras un mail de confirmación de la misma. Gracias por confiar en nosotros:)",
    });

    const [
      userData,
    ] = await connection.query(`SELECT email FROM user WHERE id=?`, [user_id]);

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
