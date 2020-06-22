require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
async function deleteProduct(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    if (req.auth.role !== 'admin') {
      throw generateError('Only admins can perform this action.', 400);
    }
    const [
      result
    ] = await connection.query('select name from product where pk_id=?', [id]);

    await connection.query('delete from product where pk_id=?', [id]);
    console.log(result);
    res.send({
      status: 'ok',
      message: `This product (${result[0].name}) has been succesfully deleted.`
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { deleteProduct };
