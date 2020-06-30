require("dotenv").config();

const { getConnection } = require("../../db");
const {
  generateError,
  processAndSavePhoto,
  deletePhoto,
} = require("../../helpers");
const { editProductSchema } = require("../../validations/edit_product");

async function editProduct(req, res, next) {
  let connection;
  try {
    await editProductSchema.validateAsync(req.body);
    connection = await getConnection();
    const { id } = req.params;
    const { name, description, price } = req.body;

    const [
      current,
    ] = await connection.query(` SELECT pk_id FROM product WHERE pk_id=?`, [
      id,
    ]);
    if (!current.length) {
      throw generateError(
        `The product with this ID (${id}) does not exist`,
        404
      );
    }

    let savedFileName;

    if (req.files && req.files.product_picture) {
      try {
        savedFileName = await processAndSavePhoto(req.files.product_picture);
        if (current && current[0].product_picture) {
          await deletePhoto(current[0].product_picture);
        }
      } catch (error) {
        throw generateError(
          "No se puede procesar la imagen. Intentelo de nuevo más tarde.",
          400
        );
      }
    } else {
      savedFileName = current.product_picture;
    }
    await connection.query(
      ` UPDATE product SET name=?, description=?, price=?, product_picture=?  WHERE pk_id=?`,
      [name, description, price, savedFileName, id]
    );
    res.send({ status: "ok", message: "Product successfully updated." });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editProduct };
