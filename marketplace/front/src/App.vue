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
body,
html {
  margin: 0 auto;
  height: 100vh;
  background: #f4bfdb;
  font-family: "Noto Sans", sans-serif;
}
#app {
  font-family: Noto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #080b0c;
}
#nav {
  padding: 30px;
}
a {
  font-weight: bold;
  color: #87baab;
  text-decoration: none;
}
a.router-link-exact-active {
  color: #ffff70;
}
</style>
