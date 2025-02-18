<template>
  <div>
    <h1>{{ cuisinier?.nom }}</h1>
    <p>Spécialités : {{ cuisinier?.specialites.join(", ") }}</p>
    <ul>
      <li v-for="plat in cuisinier?.plats" :key="plat">
        {{ plat }} <button @click="ajouterAuPanier(plat)">Ajouter</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePanierStore } from "../stores/PanierStore";

interface Cuisinier {
  id: number;
  nom: string;
  specialites: string[];
  plats: string[];
}

const route = useRoute();
const panierStore = usePanierStore();
const cuisinier = ref<Cuisinier | null>(null);

onMounted(() => {
  const data: Record<number, Cuisinier> = {
    1: {
      id: 1,
      nom: "Chef Pierre",
      specialites: ["Française"],
      plats: ["Quiche", "Bœuf bourguignon"],
    },
    2: { id: 2, nom: "Chef Maria", specialites: ["Espagnole"], plats: ["Paella", "Tortilla"] },
  };
  cuisinier.value = data[Number(route.params.id)] || null;
});

const ajouterAuPanier = (plat: string) => {
  panierStore.ajouterPlat(plat);
};
</script>

<style></style>
