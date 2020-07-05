<template>
  <div id="nav">
    <ul class="menu">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/market">Market</router-link>
      </li>
      <li>
        <router-link to="/add-product" v-show="seeIsLogged">Add Product</router-link>
      </li>
      <li>
        <router-link to="/profile" v-show="seeIsLogged">Profile</router-link>
      </li>
      <li>
        <router-link to="/user-list" v-if="seeIsLogged">User List</router-link>
      </li>
      <li class="login" v-show="!seeIsLogged">
        <router-link class="loginA" to="/login">Log in</router-link>
      </li>
      <li v-if="seeIsLogged">
        <div class="button_cont" @click="logoutUser()">
          <a class="example_c" target="_blank" rel="nofollow noopener">Logout</a>
        </div>
      </li>
      <br />
    </ul>
  </div>
</template>

<script>
import { isLogged } from "../api/utils";
import { clearLogin } from "../api/utils";
import { checkAdmin } from "../api/utils";

export default {
  name: "MenuCustom",
  data() {
    return {
      seeIsLogged: false
    };
  },
  methods: {
    logoutUser() {
      this.$router.push("/");
      location.reload();
      return clearLogin();
    },
    showIsLogged() {
      this.seeIsLogged = isLogged();
    }
  },
  created() {
    this.showIsLogged();
  }
};
</script>

<style scoped>
#nav {
  background: #020103;
  max-width: 100vw;
}

.menu {
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
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
  padding: 0.5rem;
}
li:hover {
  opacity: 100%;
}

.login {
  background: #ffff70;
  border-radius: 5rem;
}

.loginA {
  color: #020103;
}
.loginA:hover {
  transition: all 0.4s ease 0s;
  color: #020103;
}

.example_c {
  color: #a22c29;
}

a {
  text-align: center;
  padding: 1rem 0;
  text-decoration: none;
}

a:hover {
  transition: all 0.4s ease 0s;
  color: #ffff70;
  border-bottom: 3px solid #ffff70;
}

h3 {
  color: whitesmoke;
}
</style>
