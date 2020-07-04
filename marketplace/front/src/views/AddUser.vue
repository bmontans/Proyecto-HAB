<template>
  <div class="newUser">
    <div class="addUser">
      <vue-headful title="Add user" />
      <div>
        <h1>Already got an account?</h1>
        <p>
          Click
          <router-link to="/login">here</router-link>, to log in with your credentials.
        </p>
      </div>
      <br />
      <p class="required" v-show="required">Filling all fields is required to set up your account!</p>
      <!-- FORMULARIO -->
      <div>
        <label for="nombre">Username</label>
        <br />
        <input type="text" name="username" placeholder="Username..." v-model="username" />
        <br />
        <br />
        <label for="nombre">Address</label>
        <br />
        <input type="text" name="address" placeholder="Address..." v-model="address" />
        <br />
        <br />
        <label for="password">Password</label>
        <br />
        <input type="password" name="password" placeholder="Password..." v-model="password" />
        <br />
        <br />
        <label for="email">Email</label>
        <br />
        <input type="text" name="email" placeholder="Email..." v-model="email" />
        <br />
        <br />
        <label for="birthdate">Birthdate</label>
        <br />
        <input type="date" name="birthdate" placeholder="Birthdate..." v-model="birthdate" />
        <br />
        <br />
        <button @click="addUser(username, address, password, email, birthdate)">CREAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddUser",
  components: {},
  data() {
    return {
      username: "",
      address: "",
      password: "",
      email: "",
      birthdate: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    validatingData() {
      if (
        this.username === "" ||
        this.password === "" ||
        this.email === "" ||
        this.birthdate === ""
      ) {
        this.correctData = false; // NO ENVIAR //
        this.required = true;
      } else {
        this.correctData = true; // SI ENVIAR //
        this.required = false;
      }
    },
    addUser(username, address, password, email, birthdate) {
      // VALIDANDO DATOS DEL FORMULARIO //
      this.validatingData();
      if (this.correctData === true) {
        var self = this;
        axios
          .post("http://localhost:3000/user", {
            username: self.username,
            address: self.address,
            password: self.password,
            email: self.email,
            birthdate: self.birthdate
          })
          .then(function(response) {
            self.emptyFields();
            console.log(response);
            Swal.fire(
              "User successfully created!",
              "A confirmation link has been sent to your email. Check your inbox!",
              "success"
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Information is missing",
          timer: 3000
        });
      }
    },
    emptyFields() {
      this.username = "";
      this.address = "";
      this.password = "";
      this.email = "";
      this.birthdate = "";
    }
  }
};
</script>

<style scoped>
.newUser {
  background-image: url("../assets/addUser-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 900px;
  width: 1800px;
  max-width: 100vw;
  max-height: 85vh;
  margin-top: 0rem;
}

.addUser {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 500px;
  margin-top: -300px;
  margin-left: -200px;
  font-weight: bold;
  background: #020103;
  opacity: 90%;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0px 8px 6px -6px rgba(96, 86, 139, 0.548);
}

.required {
  color: red;
}
label {
  padding: 2rem;
  color: whitesmoke;
}

a {
  font-weight: bold;
  color: #ffff70;
  text-transform: uppercase;
}
</style>
