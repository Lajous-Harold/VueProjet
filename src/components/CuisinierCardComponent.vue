<template>
  <div class="cuisinier-card">
    <h3>{{ cuisinier.nom }}</h3>
    <p>{{ cuisinier.specialites.join(", ") }}</p>
    <router-link :to="'/cuisinier/' + cuisinier.id">Voir les plats</router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cuisinier: {
    id: number;
    nom: string;
    specialites: string[];
  };
}>();
</script>

<style scoped>
.cuisinier-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
}
</style>
