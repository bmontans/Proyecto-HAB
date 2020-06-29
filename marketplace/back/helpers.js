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
    finalImage.resize(150);
  }

  await finalImage.toFile(path.join(fileUploadPath, savedFileName));

  return savedFileName;
}
async function deletePhoto(imagePath) {
  if (imagePath !== "perfil.png")
    await fs.unlink(path.join(fileUploadPath, imagePath));
}
function searchProducts(queryParams) {
  let query = `SELECT nombre_articulo, fecha_inicio, fecha_fin, disponibilidad, tipo, subtipo, precio, imagen
    FROM articulos`;

  const params = [];
  const {
    nombre_articulo,
    fecha_inicio,
    fecha_fin,
    disponibilidad,
    tipo,
    subtipo,
    precio,
    imagen,
  } = queryParams;

  if (
    nombre_articulo ||
    fecha_inicio ||
    fecha_fin ||
    disponibilidad ||
    tipo ||
    subtipo ||
    precio ||
    imagen
  ) {
    query = `${query} WHERE`;
    const conditions = [];

    if (nombre_articulo) {
      conditions.push("nombre_articulo LIKE ?");
      params.push(`%${nombre_articulo}%`);
    }

    if (fecha_inicio) {
      conditions.push("fecha_inicio >= ?");
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      conditions.push("fecha_fin <= ?");
      params.push(fecha_fin);
    }
    if (disponibilidad) {
      conditions.push("disponibilidad = ?");
      params.push(disponibilidad);
    }
    if (tipo) {
      conditions.push("tipo = ?");
      params.push(tipo);
    }

    if (subtipo) {
      conditions.push("subtipo = ?");
      params.push(subtipo);
    }

    if (precio) {
      conditions.push("precio <= ?");
      params.push(precio);
    }
    if (imagen) {
      conditions.push("imagen LIKE ?");
      params.push(`%${imagen}%`);
    }

    query = `${query} ${conditions.join(" AND ")} `;
  }
  query = `${query} 
    ORDER BY fecha_fin`;
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
