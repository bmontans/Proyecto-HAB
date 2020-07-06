<template>
  <div class="footer">
    <ul>
      <li>
        <h4>Brais Montáns Bouza / 2020</h4>
      </li>
      <li>
        <a href="https://es.linkedin.com/in/brais-mont%C3%A1ns-bouza-75a412116">
          <img src="../assets/linkedin.png" alt />
        </a>
      </li>
      <li>
        <a href="https://github.com/Xarelyth">
          <img src="../assets/github.png" alt />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FooterCustom"
};
</script>

<style scoped>
div.footer {
  margin: 0;
  background: #020103;
  max-width: 100vw;
  color: #ffff70;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  justify-content: center;
  text-transform: uppercase;
  text-decoration: none;
  align-items: center;
  opacity: 70%;
  padding: 0.5rem;
  margin: 0, 0.5rem;
}

h4 {
  background: black;
  padding: 0.5rem;
  margin: 0 auto;
}

a {
  color: #ffff70;
  text-transform: uppercase;
}

img {
  height: 25px;
  width: 25px;
}
</style>
