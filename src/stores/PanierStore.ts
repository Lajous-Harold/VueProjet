import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";

export const usePanierStore = defineStore("panier", {
  state: () => ({
    panier: [] as string[],
  }),
  actions: {
    ajouterPlat(plat: string) {
      const authStore = useAuthStore();
      if (!authStore.user) return;

      this.panier.push(plat);
      this.sauvegarderPanier();
    },
    retirerPlat(index: number) {
      this.panier.splice(index, 1);
      this.sauvegarderPanier();
    },
    sauvegarderPanier() {
      const authStore = useAuthStore();
      if (authStore.user) {
        localStorage.setItem(`panier_${authStore.user.email}`, JSON.stringify(this.panier));
      }
    },
    chargerPanier() {
      const authStore = useAuthStore();
      if (authStore.user) {
        const savedPanier = localStorage.getItem(`panier_${authStore.user.email}`);
        this.panier = savedPanier ? JSON.parse(savedPanier) : [];
      }
    },
    viderPanier() {
      this.panier = [];
    },
  },
});
