<template>
  <div>
    <vue-headful title="User List" />
    <div>
      <ul>
        <li v-for="(user, index) in users" :key="user.id">
          <div class="Users">
            <img class="profile_pic" :src="user.profile_picture" alt="profile pic" />
            <p>User ID: {{ user.pk_id }}</p>
            <p>Creation Date: {{user.creation_date | moment("D-MM-YYYY") }}</p>
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Address: {{ user.address }}</p>
            <button @click="deleteUserEvent(index)">DELETE</button>
            <button @click="updateUserEvent(index)">EDIT</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllUsers",
  props: {
    users: Array
  },
  methods: {
    deleteUserEvent(index) {
      console.log(this.users);
      let data = this.users[index].pk_id;
      this.$emit("borrar", data);
    },
    updateUserEvent(index) {
      let data = this.users[index];
      this.$emit("editar", data);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  margin: 2rem;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  width: 40%;
  text-align: left;

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
}

img {
  min-width: 450px;
  min-height: 450px;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  border: 4px solid #467599;
}
</style>
