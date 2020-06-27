<template>
  <div class="home">
    <vue-headful title="products" />
    <div class="menu"></div>
    <showallproducts
      :products="products"
      :product="product"
      v-on:comprar="buyProduct"
      v-on:openModal="showPurchaseText"
    ></showallproducts>
    <div class="modal" v-show="openPurchaseBox">
      <div class="modalBox">
        <input type="text" v-model="newAddress" placeholder="Address" />
        <br />
        <p>Añade tu dirección</p>
        <br />
        <button @click="buyProduct(product)">BUY</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import vueHeadful from "vue-headful";
import showproducts from "@/components/ShowProducts.vue";
import showallproducts from "@/components/ShowAllProducts.vue";

export default {
  name: "Home",
  components: { showallproducts },
  data() {
    return {
      products: [],
      product: {},
      name: "",
      category: "",
      description: "",
      price: "",
      newName: "",
      newCategory: "",
      newDescription: "",
      newPrice: "",
      newAddress: "",
      correctData: false,
      openPurchaseBox: false,
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
    buyProduct(data) {
      this.validatePurchase();
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(self.correctData);
      if (self.correctData === true) {
        axios
          .post("http://localhost:3000/products/purchase/" + data, {})
          .then(function(response) {
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "Product successfully purchased.",
              text:
                "You'll soon receive a confirmation email. Check your inbox!",
              timer: "5000",
            });
          })
          .catch(function(error) {
            console.error(error.response.data.message);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Information is missing",
          timer: 3000,
        });
      }
    },
    validatePurchase() {
      if (this.address === "" || this.price === "") {
        this.correctData = false;
      } else {
        this.correctData = true;
      }
    },
    showPurchaseText(data) {
      console.log(data);
      this.openPurchaseBox = true;
      this.newAddress = data.address;
      this.id = data.id;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modalBox {
  background: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
