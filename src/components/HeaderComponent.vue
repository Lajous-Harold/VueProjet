<template>
  <header>
    <div v-if="alertStore.message" :class="['alert', alertStore.type]">
      {{ alertStore.message }}
    </div>

    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/cuisiniers">Cuisiniers</router-link>

      <router-link v-if="authStore.user" to="/panier">🛒 ({{ panier.length }})</router-link>

      <template v-if="authStore.user">
        <button @click="logout">Déconnexion</button>
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
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const panierStore = usePanierStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const { panier } = storeToRefs(panierStore);

const logout = () => {
  authStore.logout();
  alertStore.showMessage("Vous êtes déconnecté.", "success");
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
</style>
