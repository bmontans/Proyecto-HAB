<template>
  <div class="home">
    <img src="../assets/home-background.jpeg" alt />
  </div>
</template>

<script>
import axios from "axios";
import showproducts from "@/components/ShowProducts.vue";

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
div.home {
  background: black;
  max-width: 100vw;
}

img {
  max-height: 85vh;
}
</style>


