import { defineStore } from "pinia";

export const usePanierStore = defineStore("panier", {
  state: () => ({
    panier: [] as string[],
  }),
  actions: {
    ajouterPlat(plat: string) {
      this.panier.push(plat);
    },
  },
});
