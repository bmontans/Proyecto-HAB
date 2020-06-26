<template>
  <div>
    <userinfo
      class="box"
      v-show="!editUser"
      :user="user"
      v-on:borrar="deleteUsers"
      v-on:editar="showEditText"
    ></userinfo>
    <button @click="userShowEditPassword()">Update your Password</button>
    <div class="modal" v-show="editUser">
      <div class="modalBox">
        <p class="editUser">EDIT USER PROFILE</p>
        <p>Username:</p>
        <input type="text" v-model="newUsername" placeholder="Username" />
        <br />
        <p>New email:</p>
        <input type="text" v-model="newEmail" placeholder="Email" />
        <br />
        <p>New address:</p>
        <input type="text" v-model="newAddress" placeholder="Address" />
        <br />
        <button @click="updateUsers()">Actualizar</button>
        <button @click="editUser = false">Cerrar</button>
        <br />
        <br />
        <div class="editAvatar">
          <label>
            If you you want update your avatar
            <input
              type="file"
              id="avatar"
              ref="profilePicture"
              @change="handleFileUpload()"
            />
          </label>
          <button @click="submitFile()">Update Avatar</button>
        </div>
      </div>
    </div>

    <!-- EDICION DE CONTRASEÑA -->
    <div class="password" v-show="seeEditPassword">
      <div class="passwordBox">
        <p class="editPassword">EDIT YOUR PASSWORD</p>
        <p>OLD PASSWORD</p>
        <input type="password" v-model="oldPassword" placeholder="Your old password" />
        <br />
        <p>NEW PASSWORD</p>
        <input type="password" v-model="password" placeholder="New password" />
        <br />
        <p>REPEAT PASSWORD</p>
        <input type="password" v-model="passwordRepeat" placeholder="Repeat your new Paswword" />
        <br />
        <button @click="updatePassword()">Update</button>
        <button @click="seeEditPassword = false">Back to profile</button>
      </div>
    </div>
    <div class="userProducts">
      <ul>
        <li v-for="product in products" :key="product.id">
          <p>Product name: {{ product.name }}</p>
          <p>Category: {{ product.category }}</p>
          <p>Description: {{ product.description }}</p>
          <p>Price: {{ product.price }}€</p>
          <button @click="showProduct(product)">Editar</button>
          <button @click="deleteProduct(product)">Borrar</button>
        </li>
      </ul>
    </div>
    <div class="editProduct" v-show="seeEditProduct">
      <div class="editProductBox">
        <h4>Editar producto</h4>

        <input type="text" v-model="newProductName" placeholder="Product name" />
        <br />
        <input type="text" v-model="newProductDescription" placeholder="Price" />
        <br />
        <input type="text" v-model="newProductPrice" placeholder="Description" />
        <br />

        <br />
        <button @click="editProduct()">Edit your product info</button>
        <br />
        <div class="editUserProduct">
          <button @click="seeEditProduct = false">Return</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import userinfo from "../components/UserInfo";
export default {
  name: "UserProfile",
  components: { userinfo },
  data() {
    return {
      user: {},
      products: [],
      newUsername: "",
      newEmail: "",
      newAddress: "",
      id: null,
      editUser: false,
      oldPassword: "",
      password: "",
      passwordRepeat: "",
      seeEditPassword: false,
      newProductName: "",
      newProductDescription: "",
      newProductPrice: "",
      seeEditProduct: false,
      profilePicture: ""
    };
  },
  methods: {
    getUserData() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3000/user/" + data)
        .then(function(response) {
          self.user = response.data.data;
          self.user.profile_picture =
            "http://localhost:3000/uploads/" + self.user.profile_picture;
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteUsers(data) {
      const self = this;
      const token = localStorage.getItem("token");
      let id = data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "You're about to delete an user.",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete("http://localhost:3000/user/" + id)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              Swal.fire("Forbidden!", "Only admins can perform this action.");
            });
          Swal.fire("Deleted!", "User has been deleted.");
        }
      });
    },
    updateUsers() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/user/" + data, {
          username: self.newUsername,
          email: self.newEmail,
          address: self.newAddress,
          id: self.id
        })
        .then(function(response) {
          self.editUser = true;
          Swal.fire(
            "¡User successfully updated",
            "Press okay to continue.",
            "success"
          );
          location.reload();
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    updatePassword() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/user/password/" + data, {
          oldPassword: self.oldPassword,
          newPassword: self.password,
          newPasswordRepeat: self.passwordRepeat
        })
        .then(function(response) {
          Swal.fire({
            title: "Your password has been updated"
          });
          self.emptyFiledsPassword();
          self.seeEditPassword = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    getUserProducts() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3000/user/products/" + data)
        .then(function(response) {
          console.log(response);
          self.products = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showEditText(data) {
      this.editUser = true;
      this.newUsername = data.username;
      this.newEmail = data.email;
      this.newAddress = data.address;
      this.id = data.id;
    },
    reloadPage() {
      location.reload();
    },
    userShowEditPassword() {
      this.seeEditPassword = true;
      this.password = "";
      this.passwordRepeat = "";
    },
    emptyFiledsPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.newPasswordRepeat = "";
    },
    editProduct() {
      const self = this;
      const id = self.id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("name", self.newProductName);
      formData.append("description", self.newProductDescription);
      formData.append("price", self.newProductPrice);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/product/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          self.seeEditProduct = false;
          Swal.fire({
            icon: "success",
            title: "Your product has been successfully updated",
            timer: "3000"
          });
          location.reload();
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showProduct(product) {
      this.id = product.pk_id;
      this.newProductName = product.name;
      this.newProductDescription = product.description;
      this.newProductPrice = product.price;
      this.seeEditProduct = true;
    },
    deleteProduct(product) {
      const self = this;
      const id = product.pk_id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "You're going to delete your product.",
        text:
          "If you delist your product you'll have to manually list it again",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it."
      }).then(result => {
        if (result.value) {
          axios
            .delete("http://localhost:3000/product/" + id)
            .then(function(response) {
              location.reload();
            })
            .catch(function(error) {
              console.error(error.response.data.message);
            });
          Swal.fire({
            title: "Product successfully deleted",
            icon: "success",
            confirmButtonText: "OK",
            timer: "5000"
          });
        } else {
          Swal.fire({
            title: "You cancelled the process.",
            icon: "warning",
            confirmButtonText: "OK",
            timer: "5000"
          });
        }
      });
    },
    handleFileUpload() {
      this.profilePicture = this.$refs.profilePicture.files[0];
    },
    submitFile() {
      const self = this;
      //enviar el archivo al servidor
      const server = "http://localhost:3000/";
      const data = localStorage.getItem("id");
      let formData = new FormData(); //iniciamos el form data
      formData.append("profile_picture", self.profilePicture);
      formData.append("username", self.newUsername);
      formData.append("email", self.newEmail);
      formData.append("address", self.newAddress); // añadimos el form data que queremos enviar
      console.log("holi");
      axios
        .put(server + "user/" + data, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          console.log("SUCCESS!!");
        })
        .catch(function(error) {
          console.error("FAILURE!!", error.response.data.message);
        });
    }
  },
  created() {
    this.getUserData();
    this.getUserProducts();
  }
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.editProduct {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.editProductBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.password {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.passwordBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  margin: 2rem;
  border-radius: 1rem;
  border: 2px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background: #eee5e9;
  width: 80%;
}
</style>
