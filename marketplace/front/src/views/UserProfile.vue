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
        <p class="editUser">Edita los datos del usuario</p>
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
        <button @click="reloadPage()">Cerrar</button>
      </div>
    </div>
    <div class="password" v-show="seeEditPassword">
      <input type="password" v-model="oldPassword" placeholder="Your old password" />
      <input type="password" v-model="password" placeholder="New password" />
      <input type="password" v-model="passwordRepeat" placeholder="Repeat your new Paswword" />
      <br />
      <button @click="updatePassword()">Update</button>
      <button @click="seeEditPassword = false">Back to profile</button>
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
      newUsername: "",
      newEmail: "",
      newAddress: "",
      id: null,
      editUser: false,
      oldPassword: "",
      password: "",
      passwordRepeat: "",
      seeEditPassword: false
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
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    deleteUsers(data) {
      let id = data;
      axios
        .delete("http://localhost:3000/users/del/" + id)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
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
          address: self.newAddress
        })
        .then(function(response) {
          self.editUser = true;
          Swal.fire(
            "¡Usere actualizado correctamente!",
            "Pulsa OK para continuar.",
            "success"
          );
          location.reload();
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
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
            "¡Usere actualizado correctamente!",
            "Pulsa OK para continuar.",
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
    }
  },
  created() {
    this.getUserData();
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
</style>