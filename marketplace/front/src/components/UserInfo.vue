<template>
  <div>
    <vue-headful title="Lista de users" />
    <div>
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
            <button @click="deleteUserEvent()">Borrar</button>
            <button @click="updateUserEvent()">Editar</button>
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
    deleteUserEvent(index) {
      let data = this.user.id;
      this.$emit("borrar", data);
    },
    updateUserEvent() {
      let data = this.user;
      this.$emit("editar", data);
    }
  }
};
</script>

<style scoped>
.profile_pic {
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
  border-radius: 1rem;
  border: 2px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background: #a39594;
  width: 80%;
}
</style>
