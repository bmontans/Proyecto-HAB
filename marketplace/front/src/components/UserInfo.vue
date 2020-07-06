<template>
  <div>
    <vue-headful title="User Profile" />
    <div>
      <ul>
        <li>
          <div class="welcome">
            <h2>Welcome to your personal profile, {{ user.username }}.</h2>
            <br />
            <p>
              In this page you can edit your personal info, change your password, upload a profile picture
              <br />and check both your products listed and your products purchased in the marketplace!
            </p>
          </div>
          <br />
          <div class="user">
            <div class="pic">
              <img class="profile_pic" :src="user.profile_picture" alt="user picture" />
            </div>
            <div class="info">
              <h3>Username</h3>
              <p>{{ user.username }}</p>
              <h3>Email</h3>
              <p>{{ user.email }}</p>
              <h3>Location</h3>
              <p>{{ user.address }}</p>
              <h3>Birthdate</h3>
              <p>{{ user.birthdate | moment("D-MM-YYYY") }}</p>
              <h3>Creation Date</h3>
              <p>{{ user.creation_date | moment("D-MM-YYYY") }}</p>
              <button @click="updateUserEvent()">EDIT INFO</button>
              <button @click="userShowEditPassword()">UPDATE PASSWORD</button>
              <br />
              <br />
              <button @click="userProducts()">MY PRODUCTS</button>
              <button @click="userPurchases()">MY PURCHASES</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: Object
  },
  methods: {
    updateUserEvent() {
      let data = this.user;
      this.$emit("editar", data);
    },
    userShowEditPassword() {
      let data = this.user;
      this.$emit("editarPassword", data);
    },
    userProducts() {
      let data = this.user;
      this.$emit("myProducts", data);
    },
    userPurchases() {
      let data = this.user;
      this.$emit("myPurchases", data);
    }
  }
};
</script>

<style scoped>
img.profile_pic {
  min-width: 450px;
  min-height: 450px;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  border: 2px solid #467599;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  width: 80%;
  text-align: left;

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
  box-shadow: 0px 8px 6px -6px rgba(0, 0, 0, 0.248);
}

.user {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pic {
  padding: 0 5rem 0 0;
}

h2,
h3 {
  color: #467599;
}

h3 {
  font-size: 22px;
  text-transform: uppercase;
  font-weight: bold;
}

.welcome {
  text-align: center;
  border-bottom: 2px solid #467599;
  margin-bottom: 1rem;
}

button {
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
  margin-right: 0.4rem;
  text-decoration: none;
  text-shadow: 0px 1px 0px #7cacde;
}
</style>
