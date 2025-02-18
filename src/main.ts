import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import { useAuthStore } from "./stores/AuthStore";

const app = createApp(App);

app.use(createPinia());
const authStore = useAuthStore();
authStore.checkSession();

app.use(router);

app.mount("#app");
