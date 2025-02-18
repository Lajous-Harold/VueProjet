<template>
  <header>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/cuisiniers">Cuisiniers</router-link>
      <router-link to="/auth">Connexion</router-link>
      <router-link to="/panier">🛒 ({{ panier.length }})</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { usePanierStore } from "../stores/PanierStore";
import { storeToRefs } from "pinia";

const panierStore = usePanierStore();
const { panier } = storeToRefs(panierStore);
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #333;
  color: white;
}
nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}
</style>
