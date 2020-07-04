<template>
  <div class="footer">
    <h4>
      Brais Montáns Bouza 2020 -
      <router-link to="/about">About</router-link>
    </h4>
  </div>
</template>

<script>
export default {
  name: "FooterCustom"
};
</script>

<style scoped>
div.footer {
  background: #020103;
  max-width: 100vw;
  color: #ffff70;
}

h4 {
  background: black;
  padding: 1rem;
  margin: 0 auto;
}

a {
  color: #ffff70;
  text-transform: uppercase;
}
</style>
