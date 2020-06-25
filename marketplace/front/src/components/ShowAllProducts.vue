<template>
  <div>
    <div>
      <ul>
        <li v-for="(product, index) in products" :key="product.id">
          <div class="products">
            <p>{{product.pk_id}}</p>
            <p>{{ product.name }}</p>
            <p>{{ product.category}}</p>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}€</p>
            <button @click="buyProductEvent(index)">Contact seller</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowAllProducts",
  props: {
    products: Array
  },
  methods: {
    buyProductEvent(index) {
      let data = this.products[index].id;
      this.$emit("comprar", data);
    },
    contactUserEvent() {
      this.$emit("showcontact");
    },
    contactUserEmailEvent(message, presentation) {
      this.$emit("contact", this.message, presentation);
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
  border: 2px solid black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  background: #eee5e9;
  width: 80%;
}
</style>