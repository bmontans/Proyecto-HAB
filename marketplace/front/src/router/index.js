import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Swal from "sweetalert2";
import { isLoggedIn } from "../api/utils";
import { checkAdmin } from "../api/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../views/Error.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("../views/Market.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: () => import("../views/AddUser.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: () => import("../views/AddProduct.vue"),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: "/user-list",
    name: "UserList",
    component: () => import("../views/UserList.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

/* // COMPROBANDO CADA PÁGINA POR SI LA PERSONA ESTÁ LOGUEADA //
router.beforeEach((to, from, next) => {
  // SI LA RUTA ES PRIVADA Y LA PERSONA NO TIENE TOKEN //
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
    Swal.fire({
      icon: "error",
      title: "Ooops...",
      text: "You need to log in first!",
    });
  }
  if (to.meta.allowNoAdmin === false && !checkAdmin()) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
    Swal.fire({
      icon: "error",
      title: "Ooops...",
      text: "Unicamente los administradores tienen acceso a esta pestaña.",
    });
  } else {
    next();
  }
}); */

export default router;
