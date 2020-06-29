// LÓGICA DE AUTENTIFICACIÓN //

// utils.js = auth.js //

import axios from "axios";
import jwt from "jwt-decode";

const ENDPOINT = "http://localhost:3000";
const AUTH_TOKEN_KEY = "authToken";
const ROLE = "role";

// FUNCION DE LOGIN //

export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/auth`,
        method: "POST",
        data: {
          email: email,
          password: password,
          grant_type: "password",
        },
      });
      setAuthToken(res.data.token);
      setAdmin(res.data.admin);
      resolve();
    } catch (err) {
      console.log("Error en login: ", err);
      reject(err);
    }
  });
}

// GUARDAR TOKEN EN LOCAL STORAGE //
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// LOGOUT //

export function clearLogin() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  localStorage.removeItem("address");
  clearAdmin();
}

// COGER EL TOKEN //
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// CONSIGUIENDO FECHA DE EXPIRACIÓN DEL TOKEN //

export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  // SI NO HAY TOKEN, NO SIGUE //
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

// COMPROBANDO SI LA FECHA DEL TOKEN SIGUE VIGENTE O NO //
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

// COMPROBAR SI EL USER ESTA LOGUEADO O NO //

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

// FUNCIONES PARA COMPROBAR EL ROL DEL USER //

// GUARDAR SI ES ADMIN EN LOCAL STORAGE //
export function setAdmin(admin) {
  localStorage.setItem(ROLE, admin);
}

// BORRAR ROL DEL USER EN LOCAL STORAGE //
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// RECUPERAR EL ROL DESDE EL LOCAL STORAGE //
export function getAdmin() {
  return localStorage.getItem(ROLE);
}

// COMPROBAR ROL //
export function checkAdmin() {
  let role = false;
  let admin = getAdmin();
  if (admin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}
export function deleteAuth_Token() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
}
export function deleteRole() {
  return localStorage.removeItem("role");
}
export function deleteId() {
  return localStorage.removeItem("id");
}
export function deleteUsername() {
  return localStorage.removeItem("username");
}
export function logOut() {
  deleteId();
  deleteRole();
  deleteUsername();
  deleteAuth_Token();
}

export function formatDateToDB(date) {
  return format(date, "MM-dd-yyyy");
}
