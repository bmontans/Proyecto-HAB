require("dotenv").config();
const { getConnection } = require("../../db");
const { generateError, randomString } = require("../../helpers");

async function deactivateUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    const [
      current,
    ] = await connection.query("SELECT pk_id, active FROM user where pk_id=?", [
      id,
    ]);

    if (!current.length) {
      throw generateError(`There is no user with id ${id}`, 400);
    }

    if (current[0].pk_id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("This action requires admin rights.", 401);
    }

    const registrationCode = randomString(40);

    await connection.query(
      `UPDATE user SET active=false, registrationcode=? WHERE pk_id=?`,
      [registrationCode, id]
    );
    res.send({
      status: "ok",
      message: "User has been deactivated.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { deactivateUser };
