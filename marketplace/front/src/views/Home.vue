<template>
  <div class="home">
    <img src="../assets/home-background2.jpg" alt />
    <div class="descripcion">
      <p>Old equipment laying around in your room, gathering dust?</p>
      <p>Looking for a brand new or second hand monitor to replace your current one?</p>
      <p>[WEBSITE NAME] offers an easy solution for your technological needs.</p>
      <p>Set up an account, log in with your credentials, and sell (or buy!) products from other users.</p>
      <p>No questions asked. No intermediaries. Just one click.</p>
    </div>
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
  max-height: 84.9vh;
}

.descripcion {
  position: absolute;
  text-align: left;
  font-size: 15px;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 250px;
  margin-top: -150px;
  margin-left: -200px;
  font-weight: bold;
  background: #020103;
  opacity: 90%;
  padding: 3rem;
  border: 3px solid black;
  border-radius: 20px;
  box-shadow: 0px 8px 6px -6px rgba(78, 73, 98, 0.548);
}
</style>


