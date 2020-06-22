<template>
  <div class="home">
    <vue-headful title="products" />
    <div class="menu"></div>
    <showproducts :products="products"></showproducts>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import showproducts from "@/components/ShowProducts.vue";

export default {
  name: "Home",
  components: { showproducts },
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const self = this;
      axios
        .get("http://localhost:3000/products")
        .then(function(response) {
          console.log(response);
          self.products = response.data.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
