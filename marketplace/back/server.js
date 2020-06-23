require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const { newUser } = require("./controllers/user/new_user");
const { validateUser } = require("./controllers/user/validation");
const { loginUser } = require("./controllers/user/login");
const { getUser } = require("./controllers/user/user_data.js");
const { getAllUsers } = require("./controllers/user/get_all_users");
const { editUser } = require("./controllers/user/edit_user.js");
const { updatePassword } = require("./controllers/user/update_password");
const { userIsAuthenticated, userIsAdmin } = require("./middlewares/auth");
const { deleteUser } = require("./controllers/user/delete_user");
const { deactivateUser } = require("./controllers/user/deactivate_user");
/* const { passwordRecovery } = require("./controllers/user/password_recovery"); */

const { newProduct } = require("./controllers/product/new_product");
const { productData } = require("./controllers/product/product_data");
const { getAllProducts } = require("./controllers/product/get_all_products");
const { editProduct } = require("./controllers/product/edit_product");
const { deleteProduct } = require("./controllers/product/delete_product");
const { getCategory } = require("./controllers/product/get_category");
// const { buyProduct } = require('./controllers/product/buy_product');
const { searchProduct } = require("./controllers/product/search_product");
const { getUserProducts } = require("./controllers/user/get_user_products");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//RUTAS USUARIO
app.post("/user", newUser); //crear nuevo usuario
app.post("/user/login", loginUser); //login usuario
app.get("/user/validate", validateUser); // validar usuario
app.put("/user/password/:id", userIsAuthenticated, updatePassword); // editar password usuario
app.get("/users", getAllUsers); //lista usuarios
app.get("/user/:id", userIsAuthenticated, userIsAdmin, getUser); // obtener info usuario
app.get("/user/products/:id", getUserProducts); // Listar productos de un usuario (publico)
app.put("/user/:id", userIsAuthenticated, userIsAdmin, editUser); // editar usuario
app.delete("/user/:id", userIsAuthenticated, userIsAdmin, deleteUser); //borrar usuario
app.put("/user/deactivate/:id", userIsAuthenticated, deactivateUser); //desactivar usuario
/* app.put("/user/recovery", passwordRecovery); */

//RUTAS PRODUCTO
app.post("/product", userIsAuthenticated, newProduct); //publicar un producto nuevo
app.get("/product/:id", userIsAuthenticated, userIsAdmin, productData); // obtener info profucto
app.put("/product/:id", userIsAuthenticated, userIsAdmin, editProduct); // editar info producto
app.delete("/product/:id", userIsAuthenticated, userIsAdmin, deleteProduct); //borrar producto
app.get("/products", getAllProducts); // obtener todos los productos listados
app.get("/products/:category", userIsAuthenticated, userIsAdmin, getCategory); //obtener todos los productos de x categoria
// app.post('/products/purchase/:id', userIsAuthenticated, buyProduct); // comprar producto
app.get("/products/search", searchProduct); //busqueda por nombre or categoria

// Error middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpCode || 500).send({
    status: "error",
    message: error.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "404 Not found",
  });
});
app.listen(port, () => {
  console.log(`Server working in port: ${port}`);
});
