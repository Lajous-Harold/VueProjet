import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import CuisiniersPage from "./pages/CuisiniersPage.vue";
import CuisiniersDetailPage from "./pages/CuisiniersDetailPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PanierPage from "./pages/PanierPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/cuisiniers", component: CuisiniersPage },
  { path: "/cuisinier/:id", component: CuisiniersDetailPage },
  { path: "/login", component: LoginPage },
  { path: "/panier", component: PanierPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
