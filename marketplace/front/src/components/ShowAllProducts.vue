<template>
  <div>
    <div>
      <ul>
        <li v-for="(product, index) in products" :key="product.id">
          <div class="products">
            <p>{{ product.pk_id }}</p>
            <p>{{ product.name }}</p>
            <p>{{ product.category }}</p>
            <p>{{ product.description }}</p>
            <p>{{ product.price }}€</p>
            <button @click="openModalEvent(index)">BUY</button>
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
    products: Array,
    product: Object
  },
  methods: {
    buyProductEvent(index) {
      console.log(this.products);
      let data = this.products.pk_id;
      this.$emit("comprar", data);
    },
    openModalEvent(index) {
      this.$emit("openModal", index);
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
  background: #a39594;
  width: 80%;
}
</style>
