import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import { usePanierStore } from "./PanierStore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as { email: string } | null,
  }),
  actions: {
    login(email: string, password: string, users: { email: string; password: string }[]): boolean {
      const foundUser = users.find((u) => u.email === email && u.password === password);
      const alertStore = useAlertStore();

      if (foundUser) {
        this.user = foundUser;
        localStorage.setItem("user", JSON.stringify(foundUser));

        const panierStore = usePanierStore();
        panierStore.chargerPanier();

        alertStore.showMessage("Connexion réussie !", "success");
        return true;
      }

      alertStore.showMessage("Identifiants incorrects.", "error");
      return false;
    },
    logout() {
      const alertStore = useAlertStore();
      const panierStore = usePanierStore();

      panierStore.viderPanier();
      this.user = null;
      localStorage.removeItem("user");

      alertStore.showMessage("Vous êtes déconnecté.", "success");
    },
    checkSession() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        const panierStore = usePanierStore();
        panierStore.chargerPanier();
      }
    },
  },
});
