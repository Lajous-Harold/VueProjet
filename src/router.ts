import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/:pathmatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
