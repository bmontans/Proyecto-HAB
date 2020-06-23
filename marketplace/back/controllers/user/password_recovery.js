require("dotenv").config();
const bcrypt = require("bcrypt");

const { sendEmail, generateError, randomString } = require("../../helpers.js");
const { getConnection } = require("../../db");
const {
  recoveryPasswordSchema,
} = require("../../validations/password_recovery");

async function recoveryPassword(req, res, next) {
  let connection;
  console.log("uno");

  try {
    await recoveryPasswordSchema.validateAsync(req.body);

    const { email } = req.body;

    connection = await getConnection();

    const [
      dbUser,
    ] = await connection.query(
      "SELECT pk_id, email, password FROM user WHERE email=? and active=true",
      [email]
    );

    if (!dbUser.length) {
      throw generateError(
        "There are not active users with this email in database",
        404
      );
    }

    const [user] = dbUser;
    const tempPassword = randomString(10);

    try {
      await sendEmail({
        email: user.email,
        title: "This is your new temporally password",
        content: `Your new password is ${tempPassword}. You can change it after login in`,
      });
    } catch (error) {
      console.error(error);
      throw generateError("There was an error sending you an email");
    }
    const tempDBPassword = await bcrypt.hash(tempPassword, 10);

    await connection.query("UPDATE user SET password=? WHERE pk_id=?", [
      tempDBPassword,
      user.pk_id,
    ]);

    res.send({
      staus: "ok",
      message:
        "We sent you an email with your new password. Check your spam folder.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  recoveryPassword,
};
