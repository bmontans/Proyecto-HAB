import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("../views/Market.vue"),
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: () => import("../views/AddUser.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/user-list",
    name: "UserList",
    component: () => import("../views/UserList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
