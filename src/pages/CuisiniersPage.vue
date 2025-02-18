<template>
  <div class="cuisiniers-page">
    <h1>Nos Cuisiniers</h1>

    <div v-if="loading">Chargement des cuisiniers...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="chef in cuisiniers" :key="chef.id">
          <h2>{{ chef.nom }}</h2>
          <p>Spécialités : {{ chef.specialites.join(", ") }}</p>
          <router-link :to="`/cuisinier/${chef.id}`" class="button is-primary is-light">
            Voir le chef
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAlertStore } from "../stores/AlertStore";

const cuisiniers = ref<{ id: number; nom: string; specialites: string[] }[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const alertStore = useAlertStore();

onMounted(async () => {
  try {
    const response = await fetch("/data/chefs.json");
    if (!response.ok) throw new Error("Impossible de récupérer les données.");

    cuisiniers.value = await response.json();
  } catch (err) {
    console.error("Erreur lors du chargement des chefs :", err);
    error.value = "Impossible de charger les cuisiniers.";
    alertStore.showMessage("Erreur lors du chargement des chefs.", "error");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.cuisiniers-page {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 15px;
  background: #f4f4f4;
  margin-bottom: 10px;
  border-radius: 5px;
}

.button {
  margin-top: 10px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}
</style>
