<template>
  <div id="nav">
    <ul class="menu">
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/market">Market</router-link>
      </li>
      <li>
        <router-link to="/add-product">Add Product</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/user-list">User List</router-link>
      </li>
      <li>
        <div class="button_cont" @click="logoutUser()">
          <a class="example_c" target="_blank" rel="nofollow noopener">Logout</a>
        </div>
      </li>
      <br />
    </ul>
  </div>
</template>

<script>
import { clearLogin } from "../api/utils";
export default {
  name: "MenuCustom",
  methods: {
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    }
  }
};
</script>

<style scoped>
#nav {
  background: #1e1b22;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  justify-content: center;
  text-transform: uppercase;
  text-decoration: none;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 70%;
  width: 10%;
  height: 1rem;
}
li:hover {
  opacity: 100%;
}
.example_c {
  color: #f93943;
  background: #ffffff;
  border: 2px solid #494949;
  transition: all 0.4s ease 0s;
  padding: 20px;
}
.example_c:hover {
  color: #b27092;
  background: #e84855;
  transition: all 0.4s ease 0s;
}
</style>
