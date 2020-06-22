require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getAllUsers(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.query(
      `SELECT pk_id,
        username, 
        address, 
        email, 
        birthdate,
        creation_date FROM user
        ORDER BY creation_date`
    );

    const [usersData] = result;

    if (!usersData.length) {
      throw generateError('There are no users in the database.', 401);
    }

    res.send({
      staus: 'ok',
      data: usersData
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
module.exports = { getAllUsers };
