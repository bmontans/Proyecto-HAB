<template>
  <div>
    <vue-headful title="About" />
    <div class="about">
      <h1>Hello! This was the final project made for the HACK A BOSS web programming bootcamp</h1>
      <p>
        If you want to check out my Linkedin profile and learn more about me,
        click
        <a
          href="https://es.linkedin.com/in/brais-mont%C3%A1ns-bouza-75a412116"
        >here.</a>
      </p>
      <div class="libraries">
        <p>
          This website was made possible by the following node libraries:
          <br />
          <br />
          <a href="https://www.npmjs.com/package/axios">AXIOS</a>
          <br />
          <br />
          <a href="https://expressjs.com/">EXPRESS</a>
          <br />
          <br />
          <a href="https://www.npmjs.com/package/nodemon">NODEMON</a>
          <br />
          <br />
          <a href="https://jwt.io/">JWT TOKENS</a>
          <br />
          <br />
          <a href="https://expressjs.com/en/resources/middleware/cors.html">CORS</a>
          <br />
          <br />
          <a href="http://expressjs.com/en/resources/middleware/body-parser.html">BODY-PARSER</a>
          <br />
          <br />
          <a href="https://www.npmjs.com/package/mysql">MYSQL</a>
          <br />
          <br />
          <a href="https://sweetalert2.github.io/">SWEET ALERT 2</a>
          <br />
          <br />
          <a href="https://www.npmjs.com/package/vue-headful">VUE HEADFUL</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {}
};
</script>

<style scoped>
a {
  font-weight: bold;
  color: #ffff70;
}
.about {
  margin: 7rem;
}

h1 {
  color: whitesmoke;
}

.libraries {
  font-weight: bold;
  background: rgba(0, 0, 0, 0.322);
  opacity: 80%;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0px 8px 6px -6px rgba(0, 0, 0, 0.248);
}
</style>