import Vue from "vue";
import Router from "vue-router";
import store from "./store";
const Home = () => import(/* webpackChunkName: "home" */ "./views/Home.vue");
const Main = () => import(/* webpackChunkName: "main" */ "./views/Main.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLogin) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: "*",
      component: Home
    }
  ]
});

router.beforeResolve((to, from, next) => {
  next();
});

router.afterEach((to, from) => {});

export default router;
