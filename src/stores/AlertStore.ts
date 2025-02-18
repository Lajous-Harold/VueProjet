import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: null as string | null,
    type: "" as "success" | "error" | "",
  }),
  actions: {
    showMessage(message: string, type: "success" | "error") {
      this.message = message;
      this.type = type;
      setTimeout(() => {
        this.message = null;
        this.type = "";
      }, 3000);
    },
  },
});
