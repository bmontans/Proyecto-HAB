<template>
  <div>
    <vue-headful title="UserProfile" />
    <userinfo
      class="box"
      v-show="!editUser"
      :user="user"
      v-on:editar="showEditText"
      v-on:editarPassword="userShowEditPassword"
      v-on:myProducts="showMyProducts"
      v-on:myPurchases="showBuyProducts"
    ></userinfo>
    <!--     <button @click="userShowEditPassword()">Update your Password</button> -->
    <div class="modal" v-show="editUser">
      <div class="modalBox">
        <h2>USERNAME</h2>
        <input type="text" v-model="newUsername" placeholder="Username" disabled />
        <br />
        <h2>NEW EMAIL</h2>
        <input type="text" v-model="newEmail" placeholder="Email" />
        <br />
        <h2>NEW ADDRESS</h2>
        <input type="text" v-model="newAddress" placeholder="Address" />
        <br />
        <br />
        <button @click="updateUsers()">UPDATE</button>
        <button @click="editUser = false">CANCEL</button>
        <br />
        <br />
        <div class="editAvatar">
          <label>
            You can also upload your avatar directly from your PC
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
        <h2>OLD PASSWORD</h2>
        <input type="password" v-model="oldPassword" placeholder="Your old password" />
        <br />
        <h2>NEW PASSWORD</h2>
        <input type="password" v-model="password" placeholder="New password" />
        <br />
        <h2>REPEAT PASSOWRD</h2>
        <input type="password" v-model="passwordRepeat" placeholder="Repeat your new Paswword" />
        <br />
        <br />
        <button @click="updatePassword()">Update</button>
        <button @click="seeEditPassword = false">Back to profile</button>
      </div>
    </div>

    <!-- LISTA DE PRODUCTOS COMPRADOS POR EL USUARIO -->
    <div class="userProductsPurchased" v-show="!articulosComprados">
      <ul>
        <li v-for="productAcquired in productsAcquired" :key="productAcquired.id">
          <h3>Transaction ID</h3>
          <p>{{ productAcquired.pk_id}}</p>
          <h3>Price</h3>
          <p>{{ productAcquired.price }}€</p>
          <h3>Sent to:</h3>
          <p>{{ productAcquired.address }}</p>
          <h3>Purchase date</h3>
          <p>{{ productAcquired.purchase_date | moment("D-MM-YYYY")}}</p>

          <button @click="openModal(productAcquired)">RATE</button>
          <div v-show="modal" class="modal">
            <div class="modalBox">
              <h3>Rate this product.</h3>
              <star-rating
                @rating-selected="rating = $event"
                :rating="rating"
                v-bind:star-size="33"
              ></star-rating>
              <textarea v-model="comment" name="comment" id="comment" cols="100" rows="6"></textarea>
              <br />
              <button @click="ratingProduct(productAcquired, rating, comment)">Rate this purchase</button>
              <button @click="closeModal()">Return</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- LISTA DE PRODUCTOS PUESTO A LA VENTA POR EL USUARIO -->
    <div class="userProductsListed" v-show="!showProducts">
      <ul>
        <li v-for="product in products" :key="product.id">
          <img class="product_pic" :src="product.product_picture" alt="product pic" />
          <p>{{product.pk_id}}</p>
          <h3>Product name</h3>
          <p>{{ product.name }}</p>
          <h3>Category</h3>
          <p>{{ product.category }}</p>
          <h3>Description</h3>
          <p>{{ product.description }}</p>
          <h3>Price</h3>
          <p>{{ product.price }}€</p>

          <button @click="showProduct(product)">Editar</button>
          <button @click="deleteProduct(product)">Borrar</button>
        </li>
      </ul>
    </div>
    <div class="editProduct" v-show="seeEditProduct">
      <div class="editProductBox">
        <h4>Editar producto</h4>
        <h2>PRODUCT NAME</h2>
        <input type="text" v-model="newProductName" placeholder="Product name" />
        <br />
        <h2>PRODUCT DESCRIPTION</h2>
        <input type="text" v-model="newProductDescription" placeholder="Price" />
        <br />
        <h2>PRODUCT PRICE</h2>
        <input type="text" v-model="newProductPrice" placeholder="Description" />
        <br />
        <input
          type="file"
          id="productPicture"
          ref="productPicture"
          @change="handleFileUploadProducto()"
        />
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
import VModal from "vue-js-modal";
import userinfo from "../components/UserInfo";
import StarRating from "vue-star-rating";

export default {
  name: "UserProfile",
  components: { userinfo, StarRating },
  data() {
    return {
      user: {},
      products: [],
      productsAcquired: [],
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
      profilePicture: "",
      rating: 0,
      comment: "",
      modal: false,
      productPicture: "",
      showProducts: false,
      articulosComprados: false
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
          if (!!self.user.profile_picture) {
            self.user.profile_picture =
              "http://localhost:3000/uploads/" + self.user.profile_picture;
          } else {
            self.user.profile_picture =
              "http://localhost:3000/uploads/perfil.png";
          }
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
          self.showProducts = true;
          self.products = response.data.data;
          self.products = response.data.data.map(product => {
            product.product_picture =
              "http://localhost:3000/uploads/" + product.product_picture;
            return product;
          });
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showMyProducts() {
      this.showProducts = !this.showProducts;
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
    handleFileUploadProducto() {
      this.productPicture = this.$refs.productPicture.files[0];
    },
    editProduct() {
      const self = this;
      const id = self.id;
      const idUser = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("product_picture", self.productPicture);
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
      const server = "http://localhost:3000/";
      const data = localStorage.getItem("id");
      let formData = new FormData();
      formData.append("profile_picture", self.profilePicture);
      formData.append("username", self.newUsername);
      formData.append("email", self.newEmail);
      formData.append("address", self.newAddress);
      axios
        .put(server + "user/" + data, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          location.reload();
        })
        .catch(function(error) {
          console.error(error.response.data.message);
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text:
              "There was an error processing the image. Please, try again later!",
            timer: 4000
          });
        });
    },
    // MOSTRAR ARTICULOS ADQUIRIDOS
    getPurchasedProducts() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:3000/user/products/acquired/" + data)
        .then(function(response) {
          self.articulosComprados = true;
          self.productsAcquired = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
    showBuyProducts() {
      this.articulosComprados = !this.articulosComprados;
    },
    // VALORAR PRODUCTO ADQUIRIDO
    ratingProduct(productAcquired, rating, comment) {
      self = this;
      const id = productAcquired.pk_id;
      const token = localStorage.getItem("token");
      const data = localStorage.getItem("id");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:3000/products/rating/" + id, {
          rating: rating,
          comment: comment
        })
        .then(function(response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "This product has been successfully rated.",
            timer: "5000"
          });
          location.reload();
        })
        .catch(function(error) {
          console.error(error.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Woops...",
            text: "You've already rated this product.",
            timer: "5000"
          });
        });
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    }
  },
  created() {
    this.getUserData();
    this.getUserProducts();
    this.getPurchasedProducts();
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

.modal label {
  color: #467599;
}
.modalBox {
  background: #2e3035;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
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
  background: #2e3035;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.buttons {
  padding-top: 3rem;
  text-align: left;
  margin-left: 6rem;
}
button {
  margin-right: 0.4rem;
  box-shadow: inset 0px 1px 0px 0px #bee2f9;
  background: linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%);
  background-color: #63b8ee;
  border-radius: 6px;
  border: 1px solid #3866a3;
  display: inline-block;
  cursor: pointer;
  color: #14396a;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #7cacde;
  font-size: 1rem;
  cursor: pointer;
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
  background: #2e3035;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.passwordBox h2 {
  color: black;
}

.editAvatar {
  color: whitesmoke;
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
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  width: 40%;
  text-align: left;

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
}
h2,
h3 {
  color: #467599;
}

div h2 {
  color: #467599;
}

h3 {
  font-size: 22px;
  text-transform: uppercase;
  font-weight: bold;
}

img {
  min-width: 450px;
  min-height: 450px;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  border: 2px solid #467599;
}
</style>
