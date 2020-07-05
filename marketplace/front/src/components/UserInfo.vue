<template>
  <div>
    <vue-headful title="User Profile" />
    <div>
      <h2>Welcome to your personal user profile, {{ user.username }}.</h2>
      <ul>
        <li>
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
              <button @click="updateUserEvent()">EDIT</button>
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
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
li {
  margin: 2rem;
  border: 2px solid black;
  padding: 2rem;
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
  text-decoration: underline;
}
</style>
