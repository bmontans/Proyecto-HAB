<template>
  <div>
    <vue-headful title="Lista de users" />
    <div>
      <ul>
        <li v-for="(user, index) in users" :key="user.id">
          <div class="Users">
            <img :src="user.profile_picture" alt="profile pic" />
            <p>{{ user.pk_id }}</p>
            <p>{{ user.username }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.address }}</p>
            <button @click="deleteUserEvent(index)">Borrar</button>
            <button @click="updateUserEvent(index)">Editar</button>
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
    },
    updatePasswordEvent(index) {
      let data = this.users[index];
      this.$emit("password", data);
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
  border-radius: 3rem;
  border: 2px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background: #eee5e9;
  width: 30%;
}
</style>
