import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import { useAlertStore } from "./AlertStore";

export const usePanierStore = defineStore("panier", {
  state: () => ({
    panier: [] as string[],
  }),
  actions: {
    ajouterPlat(plat: string) {
      const authStore = useAuthStore();
      const alertStore = useAlertStore();

      if (!authStore.user) {
        alertStore.showMessage("Vous devez être connecté pour ajouter un produit.", "error");
        return;
      }

      this.panier.push(plat);
      this.sauvegarderPanier();
      alertStore.showMessage("Produit ajouté au panier !", "success");
    },
    retirerPlat(index: number) {
      this.panier.splice(index, 1);
      this.sauvegarderPanier();
      const alertStore = useAlertStore();
      alertStore.showMessage("Produit retiré du panier.", "info");
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
      const alertStore = useAlertStore();
      alertStore.showMessage("Panier vidé.", "info");
    },
  },
});
