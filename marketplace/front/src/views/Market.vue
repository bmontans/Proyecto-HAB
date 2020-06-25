<template>
  <div class="home">
    <vue-headful title="products" />
    <div class="menu"></div>
    <showallproducts :products="products"></showallproducts>
  </div>
</template>

<script>
import axios from "axios";
import vueHeadful from "vue-headful";
import showproducts from "@/components/ShowProducts.vue";
import showallproducts from "@/components/ShowAllProducts.vue";

export default {
  name: "Home",
  components: { showproducts, showallproducts },
  data() {
    return {
      products: [],
      newName: "",
      newCategory: "",
      newDescription: "",
      newPrice: "",
      editProduct: false,
      oldName: "",
      oldCategory: "",
      oldDescription: "",
      oldPrice: ""
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
    },
    updateProduct() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/product/" + data, {
          name: self.newName,
          category: self.newCategory,
          description: self.newDescription,
          price: self.newPrice
        })
        .then(function(response) {
          self.editUser = true;
          Swal.fire(
            "¡Producto actualizado correctamente!",
            "Pulsa OK para continuar.",
            "success"
          );
          location.reload();
          console.log(response);
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
