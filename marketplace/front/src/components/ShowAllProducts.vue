<template>
  <div>
    <div>
      <ul>
        <li v-for="(product, index) in products" :key="product.id">
          <div class="products">
            <img class="product_pic" :src="product.product_picture" alt="product pic" />
            <h2>PRODUCT NAME</h2>
            <p>{{ product.name }}</p>
            <br />
            <h2>CATEGORY</h2>
            <p>{{ product.category }}</p>
            <p />
            <br />
            <h2>DESCRIPTION</h2>
            <p>{{ product.description }}</p>
            <br />
            <h2>PRICE</h2>
            <p>{{ product.price }}€</p>
            <p />
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
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  text-align: left;

  background: rgba(0, 0, 0, 0.322);
  border-radius: 20px;
}

h2 {
  color: #467599;
}
img {
  min-width: 450px;
  min-height: 450px;
  max-width: 500px;
  max-height: 500px;
  border-radius: 50%;
  border: 2px solid #467599;
}

button {
  padding: 1rem;
  font-size: 1.3rem;
  box-shadow: 0px 8px 6px -6px rgba(59, 67, 73, 0.678);
}
</style>
