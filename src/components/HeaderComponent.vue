<template>
  <header>
    <div v-if="alertStore.message" :class="['alert', alertStore.type]">
      {{ alertStore.message }}
    </div>

    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/cuisiniers">Cuisiniers</router-link>
      <router-link v-if="authStore.user" to="/panier">🛒 ({{ panier?.length ?? 0 }})</router-link>

      <template v-if="authStore.user">
        <button @click="logout" class="button is-danger is-small">Déconnexion</button>
      </template>
      <template v-else>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/AuthStore";
import { usePanierStore } from "../stores/PanierStore";
import { useAlertStore } from "../stores/AlertStore";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const panierStore = usePanierStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const { panier } = storeToRefs(panierStore);

const logout = () => {
  authStore.logout();
  if (route.meta.requiresAuth) {
    router.push("/login");
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #333;
  color: white;
  padding: 10px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

nav a {
  color: white;
  text-decoration: none;
}

button {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
}

.alert {
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}

.alert.success {
  background: #28a745;
  color: white;
}

.alert.error {
  background: #dc3545;
  color: white;
}

.alert.info {
  background: #007bff;
  color: white;
}
</style>
