<template>
  <div>
    <vue-headful title="Add user" />

    <br />
    <br />
    <p v-show="required">YOU NEED TO FILL ALL THE INFORMATION</p>
    <!-- FORMULARIO -->
    <div>
      <label for="nombre">Product name</label>
      <br />
      <input type="text" name="name" placeholder="Product name..." v-model="name" />
      <br />
      <br />
      <label for="category">Category</label>
      <br />
      <input type="text" name="category" placeholder="Category..." v-model="category" />
      <br />
      <br />
      <label for="description">Description</label>
      <br />
      <input type="description" name="description" placeholder="Description" v-model="description" />
      <br />
      <br />
      <label for="price">Price</label>
      <br />
      <input type="text" name="price" placeholder="Price..." v-model="price" />€
      <br />
      <br />
      <button
        @click="addProduct(name, category, description, price)"
      >LIST YOUR PRODUCT IN THE MARKETPLACE</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddProduct",
  components: {},
  data() {
    return {
      name: "",
      category: "",
      description: "",
      price: "",
      correctData: false,
      required: false
    };
  },
  methods: {
    validatingData() {
      if (
        this.name === "" ||
        this.description === "" ||
        this.price === "" ||
        this.category === ""
      ) {
        this.correctData = false; // NO ENVIAR //
        this.required = true;
      } else {
        this.correctData = true; // SI ENVIAR //
        this.required = false;
      }
    },
    addProduct() {
      this.validatingData();
      var self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://localhost:3000/product", {
          name: self.name,
          category: self.category,
          description: self.description,
          price: self.price
        })
        .then(function(response) {
          Swal.fire({
            title: "Your product has been posted successfully!"
          });
          self.emptyFields();
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    emptyFields() {
      this.name = "";
      this.category = "";
      this.description = "";
      this.price = "";
    }
  }
};
</script>

<style scoped>
p {
  color: red;
}
label {
  padding: 2rem;
}
</style>
