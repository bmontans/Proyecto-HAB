<template>
  <div>
    <allusers
      class="box"
      :users="users"
      v-on:borrar="deleteUsers"
      v-on:editar="showEditText"
      v-on:password="seeEditPassword"
    ></allusers>
    <div class="modal" v-show="editUser">
      <div class="modalBox">
        <h3>EDIT USER</h3>
        <p>Username:</p>
        <input type="text" v-model="newUsername" placeholder="Username" />
        <br />
        <input type="text" v-model="newEmail" placeholder="Email" />
        <br />
        <input type="text" v-model="newAddress" placeholder="Address" />
        <br />
        <button @click="updateUsers()">Actualizar</button>
        <button @click="reloadPage()">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import allusers from "../components/AllUsers";
export default {
  name: "UserList",
  components: { allusers },
  data() {
    return {
      users: [],
      newUsername: "",
      newEmail: "",
      newAddress: "",
      id: null,
      editUser: false,
      oldPassword: "",
      password: "",
      passwordRepeat: "",
      seeEditPassword: false,
      profilePicture: ""
    };
  },
  methods: {
    getUsers() {
      const self = this;
      axios
        .get("http://localhost:3000/users")
        .then(function(response) {
          console.log(response);
          self.users = response.data.data;
          self.users = self.users.map(user => {
            if (!!user.profile_picture) {
              user.profile_picture =
                "http://localhost:3000/uploads/" + user.profile_picture;
            } else {
              user.profile_picture = "http://localhost:3000/uploads/perfil.png";
            }
            return user;
          });
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
            "¡User actualizado correctamente!",
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
    showEditText(data) {
      this.editUser = true;
      this.newUsername = data.username;
      this.newEmail = data.email;
      this.newAddress = data.address;
      this.id = data.id;
    },
    reloadPage() {
      location.reload();
    }
  },
  created() {
    this.getUsers();
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
  background: #2e3035;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>