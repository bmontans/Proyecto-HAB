<template>
  <div>
    <allusers
      class="box"
      v-show="!editUser"
      :users="users"
      v-on:borrar="deleteUsers"
      v-on:editar="showEditText"
    ></allusers>
    <div class="modal" v-show="editUser">
      <div class="modalBox">
        <p class="editUser">Edita los datos del Usere</p>
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
  name: "UserProfile",
  components: { allusers },
  data() {
    return {
      users: [],
      user: {},
      newUsername: "",
      newEmail: "",
      newAddress: "",
      id: null,
      editUser: false
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
      axios
        .put("http://localhost:3000/users/edit/" + self.id, {
          username: self.newUsername,
          email: self.newEmail,
          address: self.newAddress,
          id: self.id
        })
        .then(function(response) {
          self.editUser = false;
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
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>