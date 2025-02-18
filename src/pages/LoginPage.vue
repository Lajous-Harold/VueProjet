<template>
  <div class="auth-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <span v-if="emailError" class="error">{{ emailError }}</span>

      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>

      <button type="submit">Se connecter</button>
    </form>
    <p>Pas encore de compte ? <router-link to="/register">Inscrivez-vous</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";

const email = ref("");
const password = ref("");
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const users = ref<{ email: string; password: string }[]>([]);
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await fetch("/data/users.json");
    users.value = await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs", error);
  }
});

const login = () => {
  emailError.value = email.value ? null : "L'email est requis";
  passwordError.value = password.value ? null : "Le mot de passe est requis";

  if (!emailError.value && !passwordError.value) {
    const success = authStore.login(email.value, password.value, users.value);

    if (success) {
      console.log("Connexion réussie !");
      router.push("/");
    } else {
      emailError.value = "Identifiants incorrects";
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
