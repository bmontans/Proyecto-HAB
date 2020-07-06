<template>
  <div class="box">
    <vue-headful title="Login" />
    <div class="login">
      <h2>Login with your credentials</h2>
      <input type="text" placeholder="Username..." v-model="username" />
      <input type="password" placeholder="Password..." v-model="password" />
      <br />
      <br />
      <button @click="login(username, password)">LOGIN</button>
      <br />
      <br />
      <div class="text">
        <br />If you're new and don't have an account, click
        <router-link to="/add-user">here</router-link>
        <br />to create a new user.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login(username, password) {
      const self = this;
      axios
        .post("http://localhost:3000/user/login", {
          username: self.username,
          password: self.password
        })
        .then(function(response) {
          console.log(response.data);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("address", response.data.address);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          self.$router.push("/");
          location.reload();
        })
        .catch(function(error) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Wrong username or password!",
            timer: 4000
          });
        });
    }
  }
};
</script>

<style scoped>
h2 {
  color: whitesmoke;
}

.box {
  background-image: url("../assets/background-keyboard.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 900px;
  max-width: 100vw;
  max-height: 81.7vh;
  margin-top: 0rem;
}

.text {
  color: whitesmoke;
}

a {
  font-weight: bold;
  color: #ffff70;
}

img {
  max-height: 84.6vh;
  max-width: 100vw;
  background-size: contain;
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 350px;
  margin-top: -200px;
  margin-left: -250px;
  font-weight: bold;
  background: #020103;
  opacity: 80%;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0px 8px 6px -6px rgba(96, 86, 139, 0.548);
}

button {
  padding: 1rem;
  font-size: 1.3rem;
  box-shadow: 0px 8px 6px -6px rgba(59, 67, 73, 0.678);
}

input {
  margin: 0.5rem;
}
</style>
