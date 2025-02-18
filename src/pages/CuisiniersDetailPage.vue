<template>
  <div v-if="cuisinier" class="cuisinier-detail">
    <h1>{{ cuisinier.nom }}</h1>
    <p>Spécialités : {{ cuisinier.specialites.join(", ") }}</p>

    <h2>Plats disponibles</h2>
    <ul>
      <li v-for="plat in cuisinier.plats" :key="plat">
        {{ plat }}
        <button v-if="authStore.user" @click="ajouterAuPanier(plat)">Ajouter</button>
        <button v-else @click="afficherMessageConnexion">Se connecter pour ajouter</button>
      </li>
    </ul>

    <p v-if="messageConnexion" class="message">{{ messageConnexion }}</p>
  </div>
  <div v-else>
    <h2>Cuisinier introuvable</h2>
    <router-link to="/cuisiniers">Retour à la liste</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePanierStore } from "../stores/PanierStore";
import { useAuthStore } from "../stores/AuthStore";
import { useAlertStore } from "../stores/AlertStore";

const route = useRoute();
const router = useRouter();
const panierStore = usePanierStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const cuisinier = ref<{ id: number; nom: string; specialites: string[]; plats: string[] } | null>(
  null
);
const messageConnexion = ref<string | null>(null);

onMounted(() => {
  const data: Record<number, { id: number; nom: string; specialites: string[]; plats: string[] }> =
    {
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
  if (!authStore.user) {
    alertStore.showMessage("Vous devez être connecté pour ajouter un produit au panier.", "error");
  } else {
    panierStore.ajouterPlat(plat);
    alertStore.showMessage("Produit ajouté au panier !", "success");
  }
};

const afficherMessageConnexion = () => {
  alertStore.showMessage("Veuillez vous connecter pour ajouter des plats.", "error");
  setTimeout(() => {
    router.push("/login"); // Redirige vers la page de connexion après 2 secondes
  }, 2000);
};
</script>

<style scoped>
.cuisinier-detail {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

h1 {
  font-size: 2em;
  color: #333;
}

p {
  font-size: 1.2em;
  margin-bottom: 10px;
}

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
  border-radius: 5px;
}

button {
  background: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

button:hover {
  background: darkgreen;
}

button:nth-child(2) {
  background: red;
}

button:nth-child(2):hover {
  background: darkred;
}

.message {
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
}
</style>
