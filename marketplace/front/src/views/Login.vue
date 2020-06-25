<template>
  <div>
    <vue-headful title="Login" />
    <div class="login">
      <h2>Login with your credentials</h2>
      <input type="text" placeholder="Username..." v-model="username" />
      <input type="password" placeholder="Password..." v-model="password" />
      <button @click="login(username, password)">LOGIN</button>
      <div>
        <br />If you're new and don't have an account, click
        <router-link to="/add-user">here</router-link> to create a new user.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login(username, password) {
      const self = this;
      axios
        .post("http://localhost:3000/user/login", {
          username: self.username,
          password: self.password,
        })
        .then(function(response) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          self.$router.push("/");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
a {
  font-weight: bold;
  color: #cf4d6f;
}
.login {
  margin: 10rem;
}
</style>
