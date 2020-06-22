require('dotenv').config();
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

function generateError(message, code) {
  const error = new Error(message);
  if (code) error.httpCode = code;
  return error;
}

function randomString(size = 20) {
  return crypto.randomBytes(size).toString('hex').slice(0, size);
}

async function sendEmail({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'delisick@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Validate your email</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}

async function purchaseConfirmation({ email, title, content }) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const msg = {
    to: email,
    from: 'delisick@gmail.com',
    subject: title,
    text: content,
    html: `<div>
      <h1>Purchase confirmation</h1>
      <p>${content}</p>  
    </div>`
  };

  await sgMail.send(msg);
}

// SUBIR IMAGEN //
/*
async function processAndSavePhoto(uploadedImage) {
  const savedFileName = `${uuid.v1()}.jpg`;

  await fs.ensureDir(imageUploadPath);

  const finalImage = sharp(uploadedImage.data);

  const imageInfo = await finalImage.metadata();

  if (imageInfo.width > 400) {
    finalImage.resize(450);
  }

  await finalImage.toFile(path.join(imageUploadPath, savedFileName));

  return savedFileName;
}
*/

module.exports = {
  sendEmail,
  generateError,
  randomString,
  purchaseConfirmation
};
