require("dotenv").config();
const { getConnection } = require("../../database/db");

async function newRating(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    ///////OCURREN MOVIDAS///////
    res.send({
      status: "ok",
      message: "Your vote was send properly: Thanks for participate",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newRating };
console.log("INTERNET!!!!");
