require("dotenv").config();

const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");
const { updateUserSchema } = require("../../validations/edit_user");

async function editUser(req, res, next) {
  let connection;
  try {
    await updateUserSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { email } = req.body;

    const [
      current,
    ] = await connection.query(` SELECT pk_id FROM user WHERE pk_id=?`, [id]);
    if (!current.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    /*if (!current.length) {
            throw generateError(`The user with id ${id} does not exist`, 404);
        }*/
    await connection.query(` UPDATE user SET email=? WHERE pk_id=?`, [
      email,
      id,
    ]);
    res.send({ status: "ok", message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUser };
