<template>
  <div>
    <div>
      <ul>
        <li v-for="(product, index) in products" :key="product.id">
          <div class="products">
            <img class="product_pic" :src="product.product_picture" alt="product pic" />
            <p>PRODUCT NAME</p>
            <p>{{ product.name }}</p>
            <br />
            <p>CATEGORY</p>
            <p>{{ product.category }}</p>
            <br />
            <p>DESCRIPTION</p>
            <p>{{ product.description }}</p>
            <br />
            <p>PRICE</p>
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
  width: 80%;

  background: rgba(0, 0, 0, 0.322);
  padding-bottom: 2rem;
  border-radius: 20px;
}
</style>
