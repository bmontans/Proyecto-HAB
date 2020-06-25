require("dotenv").config();

const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

async function getUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      `SELECT pk_id ,	creation_date, username, address,
      email, profile_picture,
      birthdate, role FROM user WHERE pk_id=?`,
      [id]
    );
    if (!result.length) {
      throw generateError(`There is not user with the id ${id}`, 404);
    }
    const [userData] = result;
    const payload = {
      creation_date: userData.creation_date,
      address: userData.address,
      profile_picture: userData.profile_picture,
      username: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      role: userData.role,
    };
    if (userData.pk_id === req.auth.id || req.auth.role === "admin") {
      payload.username = userData.username;
      payload.role = userData.role;
    }
    res.send({
      status: "ok",
      data: payload,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getUser };
