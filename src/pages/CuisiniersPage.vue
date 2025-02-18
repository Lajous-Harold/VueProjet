<template>
  <div>
    <h1>Nos cuisiniers</h1>
    <CuisinierCard v-for="cuisinier in cuisiniers" :key="cuisinier.id" :cuisinier="cuisinier" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CuisinierCard from "../components/CuisinierCardComponent.vue";

interface Cuisinier {
  id: number;
  nom: string;
  specialites: string[];
}

const cuisiniers = ref<Cuisinier[]>([]);

onMounted(() => {
  cuisiniers.value = [
    { id: 1, nom: "Chef Pierre", specialites: ["Française", "Italienne"] },
    { id: 2, nom: "Chef Maria", specialites: ["Espagnole", "Mexicaine"] },
  ];
});
</script>
<style></style>
