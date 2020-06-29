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
            <button @click="deleteProductEvent(index)">DELETE</button>
            <button @click="updateProductEvent(index)">EDIT</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowProducts",
  props: {
    products: Array
  },
  methods: {
    deleteProductEvent(index) {
      let data = this.products[index].id;
      this.$emit("borrar", data);
    },
    updateProductEvent(index) {
      let data = this.products[index];
      this.$emit("editar", data);
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
  width: 30%;
}
</style>