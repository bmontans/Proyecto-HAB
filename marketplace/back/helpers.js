require("dotenv").config();
const { format } = require("date-fns");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const path = require("path");
const fs = require("fs-extra");
const uuid = require("uuid");
const sharp = require("sharp");
const fileUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}

function randomString(size = 20) {
  return crypto.randomBytes(size).toString("hex").slice(0, size);
}

function formatDateToDB(date) {
  return format(date, "yyyy-MM-dd");
}

async function sendEmail({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "delisick@gmail.com",
    subject: title,
    text: content,
    html: `<div>
      <h1>Validate your email</h1>
      <p>${content}</p>  
    </div>`,
  };

  await sgMail.send(msg);
}

async function purchaseConfirmation({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: "delisick@gmail.com",
    subject: title,
    text: content,
    html: `<div>
      <h1>Purchase confirmation</h1>
      <p>${content}</p>  
    </div>`,
  };

  await sgMail.send(msg);
}

async function processAndSavePhoto(uploadedFile) {
  const savedFileName = `${uuid.v1()}.jpg`;
  await fs.ensureDir(fileUploadPath);
  const finalImage = sharp(uploadedFile.data);
  const FileInfo = await finalImage.metadata();

  if (FileInfo.width > 100) {
    finalImage.resize(450);
  }

  await finalImage.toFile(path.join(fileUploadPath, savedFileName));

  return savedFileName;
}
async function deletePhoto(imagePath) {
  if (imagePath !== "perfil.png")
    await fs.unlink(path.join(fileUploadPath, imagePath));
}
function searchProducts(queryParams) {
  let query = `SELECT name, category, price FROM product`;

  const params = [];
  const { name, category, price } = queryParams;

  if (name || category || price) {
    query = `${query} WHERE`;
    const conditions = [];

    if (name) {
      conditions.push("name LIKE ?");
      params.push(`%${name}%`);
    }

    if (category) {
      conditions.push("category = ?");
      params.push(category);
    }

    if (price) {
      conditions.push("price <= ?");
      params.push(price);
    }

    query = `${query} ${conditions.join(" AND ")} `;
  }
  query = `${query} 
    ORDER BY price`;
  return {
    query,
    params,
  };
}

module.exports = {
  sendEmail,
  generateError,
  randomString,
  purchaseConfirmation,
  deletePhoto,
  processAndSavePhoto,
  formatDateToDB,
  searchProducts,
};
