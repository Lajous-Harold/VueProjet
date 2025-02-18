<template>
  <div>
    <h1>Mon Panier</h1>
    <ul v-if="panier.length > 0">
      <li v-for="(plat, index) in panier" :key="index">
        {{ plat }} <button @click="retirerDuPanier(index)">❌</button>
      </li>
    </ul>
    <p v-else>Votre panier est vide.</p>
  </div>
</template>

<script setup lang="ts">
import { usePanierStore } from "../stores/PanierStore";
import { storeToRefs } from "pinia";

const panierStore = usePanierStore();
const { panier } = storeToRefs(panierStore);

const retirerDuPanier = (index: number) => {
  panierStore.retirerPlat(index);
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f4f4f4;
  margin: 5px 0;
}
button {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
