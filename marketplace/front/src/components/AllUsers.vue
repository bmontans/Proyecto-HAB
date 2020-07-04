<template>
  <div>
    <vue-headful title="User List" />
    <div>
      <ul>
        <li v-for="(user, index) in users" :key="user.id">
          <div class="Users">
            <img class="profile_pic" :src="user.profile_picture" alt="profile pic" />
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
    }
  }
};
</script>

<style scoped>
img {
  min-width: 150px;
  min-height: 150px;
  max-width: 250x;
  max-height: 250px;
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

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
}
</style>
