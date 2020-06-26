<template>
  <div class="home">
    <vue-headful title="products" />
    <div class="menu"></div>
    <showallproducts
      :products="products"
      v-on:comprar="comprar"
    ></showallproducts>
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
      oldPrice: "",
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
    comprar(data) {
      this.validateBuy();
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(self.correctData);
      if (self.correctData === true) {
        axios
          .post("http://localhost:3000/products/pedido/" + data, {
            direccion: self.datosCompra.direccion,
            fecha_inicio: self.datosCompra.fecha_inicio,
            fecha_fin: self.datosCompra.fecha_fin,
          })
          .then(function(response) {
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "Articulo comprado con exito",
              text: "Revisa tu mail para la confirmación de la compra",
              timer: "3000",
            });
            self.emptyBuy();
          })
          .catch(function(error) {
            console.error(error.response.data.message);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Faltan datos por cubrir",
          timer: 3000,
        });
      }
    },
    /*     updateProduct() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/product/" + data, {
          name: self.newName,
          category: self.newCategory,
          description: self.newDescription,
          price: self.newPrice,
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
    }, */
  },
  created() {
    this.getProducts();
  },
};
</script>
