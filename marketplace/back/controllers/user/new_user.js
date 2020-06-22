require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { newUserSchema } = require('../../validations/user');
const { generateError, randomString, sendEmail } = require('../../helpers');

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    await newUserSchema.validateAsync(req.body);

    const { username, address, email, birthdate, password } = req.body;

    const [
      existingUsername
    ] = await connection.query('SELECT pk_id FROM user WHERE username=?', [
      username
    ]);
    if (existingUsername.length) {
      throw generateError('The username already exists on the DB', 409);
    }
    const [
      existingEmail
    ] = await connection.query('SELECT pk_id from user where email=?', [email]);

    if (existingEmail.length) {
      throw generateError('This email already exists in database', 409);
    }
    const dbPassword = await bcrypt.hash(password, 10);

    const registrationCode = randomString(40);
    const validationURL = `${process.env.PUBLIC_HOST}/user/validate?code=${registrationCode}`;
    try {
      await sendEmail({
        email: email,
        title: 'You must validate your account in the App in SQL',
        content: `To validate your account paste this URL in your browser: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error('Error in the mailing. Try again later.');
    }

    await connection.query(
      `INSERT INTO user ( username, address, email, birthdate, password, creation_date, modification_date, role, active, registrationcode)
      VALUES (?,?,?,?,?,NOW(),NOW(),"normal",false,?) `,
      [username, address, email, birthdate, dbPassword, registrationCode]
    );

    res.send({
      status: 'ok',
      message:
        'User created properly.Check your email to activate your account.'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { newUser };
console.log('Viva el vino');
