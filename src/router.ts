import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";
import { useAlertStore } from "./stores/AlertStore";
import HomePage from "./pages/HomePage.vue";
import CuisiniersPage from "./pages/CuisiniersPage.vue";
import CuisiniersDetailPage from "./pages/CuisiniersDetailPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import PanierPage from "./pages/PanierPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/cuisiniers", component: CuisiniersPage },
  { path: "/cuisinier/:id", component: CuisiniersDetailPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/panier",
    component: PanierPage,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  if (to.meta.requiresAuth && !authStore.user) {
    alertStore.showMessage("Accès refusé : Veuillez vous connecter.", "error");
    next("/login");
  } else {
    next();
  }
});

export default router;
