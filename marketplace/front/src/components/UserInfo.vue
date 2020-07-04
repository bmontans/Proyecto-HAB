<template>
  <div>
    <vue-headful title="User Profile" />
    <div>
      <h2>Welcome to your personal user profile, {{ user.username }}.</h2>
      <ul>
        <li>
          <div class="User">
            <img class="profile_pic" :src="user.profile_picture" alt="user picture" />
            <p>{{ user.pk_id }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Location: {{ user.address }}</p>
            <p>Birthdate: {{ user.birthdate | moment("D-MM-YYYY") }}</p>
            <p>Creation Date: {{ user.creation_date | moment("D-MM-YYYY") }}</p>
            <button @click="updateUserEvent()">EDIT</button>
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
  min-width: 150px;
  min-height: 150px;
  max-width: 500px;
  max-height: 500px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
  width: 40%;
  text-align: left;

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
}
</style>
