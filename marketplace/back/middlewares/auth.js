require("dotenv").config();
const jwt = require("jsonwebtoken");

const { getConnection } = require("../db");
const { generateError } = require("../helpers");

async function userIsAuthenticated(req, res, next) {
  let connection;

  try {
    // Check if the authorization header is valid
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Header's authorization token is missing.");
    }

    const authorizationParts = authorization.split(" ");

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === "Bearer") {
      token = authorizationParts[1];
    } else {
      throw generateError("Cannot read token.");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error("There was an error creating the token.");
    }

    // Comprobar que la fecha de expedición del token sea mayor a la
    // fecha de última actualización de password del usuario
    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query(
      "SELECT modification_date FROM user WHERE pk_id=?",
      [id]
    );

    if (!result.length) {
      generateError("User does not exist in the database.", 400);
    }

    const [user] = result;
    // comprobar que la fecha del token menor mayor que user.lastPasswordUpdate
    // Tened en cuenta que el iat del token está guardado en segundos y node trabaja en
    // milisegundos
    if (new Date(iat * 1000) < new Date(user.modification_date)) {
      generateError("This token has expired.", 401);
    }

    req.auth = decoded;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

function userIsAdmin(req, res, next) {
  if (!req.auth && req.auth.role !== "admin") {
    const error = generateError("You have no admin rights.", 401);

    return next(error);
  }

  next();
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin,
};
