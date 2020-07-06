<template>
  <div id="app">
    <menucustom></menucustom>
    <router-view />
    <footercustom></footercustom>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "App",
  components: { menucustom, footercustom }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

body,
html {
  margin: 0 auto;
  background: #2e3035;
  font-family: "Noto Sans", sans-serif;
}
#app {
  font-family: Noto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #020103;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
#nav {
  padding: 30px;
}
a {
  font-weight: bold;
  color: whitesmoke;
  text-decoration: none;
}
a.router-link-exact-active {
  color: #ffff70;
  border-bottom: 3px solid #ffff70;
}

p {
  color: whitesmoke;
}

button {
  margin-right: 0.4rem;
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
  text-decoration: none;
  text-shadow: 0px 1px 0px #7cacde;
  font-size: 1rem;
  cursor: pointer;
}

li {
  box-shadow: 0px 8px 6px -6px rgba(0, 0, 0, 0.248);
}
</style>
