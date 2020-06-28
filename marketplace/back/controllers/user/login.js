require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");
const { loginSchema } = require("../../validations/login");
async function loginUser(req, res, next) {
  let connection;

  try {
    await loginSchema.validateAsync(req.body);

    const { username, password } = req.body;
    connection = await getConnection();
    const [
      dbUser,
    ] = await connection.query(
      "SELECT pk_id, email, password, address, username, role from user where username=? AND active=true",
      [username]
    );

    if (!dbUser.length) {
      throw generateError(
        "No hay ningún usuario activo con ese email en la base de datos. Si te acabas de registrar valida el email",
        404
      );
    }
    const [user] = dbUser;
    const passwordsMath = await bcrypt.compare(password, user.password);

    if (!passwordsMath) {
      throw generateError("Wrong password", 401);
    }

    const tokenPayload = {
      id: user.pk_id,
      username: user.username,
      role: user.role,
      mail: user.mail,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "30d",
    });
    res.send({
      status: "ok",
      message: "Login correcto",
      id: user.pk_id,
      address: user.address,
      username: user.username,
      role: user.role,
      mail: user.mail,
      data: { token },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { loginUser };
