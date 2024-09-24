import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/hello",
    component: () => import("@/components/Hello.vue"),
  },
  {
    path: "/yes",
    component: () => import("@/components/Yes.vue"),
  },
  {
    path: "/test",
    component: () => import("@/components/Test.vue"),
  },
  {
    path: "/test2",
    component: () => import("@/components/Test2.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
