require("dotenv").config();

const { getConnection } = require("../../db");
const {
  generateError,
  processAndSavePhoto,
  deletePhoto,
} = require("../../helpers");
const { updateUserSchema } = require("../../validations/edit_user");

async function editUser(req, res, next) {
  let connection;
  try {
    await updateUserSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { email, address } = req.body;

    const [
      current,
    ] = await connection.query(` SELECT pk_id FROM user WHERE pk_id=?`, [id]);
    if (!current.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    let savedFileName;

    if (req.files && req.files.profile_picture) {
      try {
        savedFileName = await processAndSavePhoto(req.files.profile_picture);
        if (current && current[0].profile_picture) {
          await deletePhoto(current[0].profile_picture);
        }
      } catch (error) {
        throw generateError(
          "No se puede procesar la imagen. Intentelo de nuevo más tarde.",
          400
        );
      }
    } else {
      savedFileName = current.profile_picture;
    }

    await connection.query(
      ` UPDATE user SET email=?, address=?, profile_picture=? WHERE pk_id=?`,
      [email, address, savedFileName, id]
    );
    res.send({ status: "ok", message: "Usuario actualizado" });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUser };
