<template>
  <div class="auth-container">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Nom" required />

      <input v-model="email" type="email" placeholder="Email" required />
      <span v-if="emailError" class="error">{{ emailError }}</span>

      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>

      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmez le mot de passe"
        required />
      <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>

      <button type="submit">S'inscrire</button>
    </form>
    <p>Déjà un compte ? <router-link to="/login">Connectez-vous</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { validateEmail, validatePassword } from "../utils/Validation";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const confirmPasswordError = ref<string | null>(null);

const register = () => {
  emailError.value = validateEmail(email.value) ? null : "Email invalide";
  passwordError.value = validatePassword(password.value)
    ? null
    : "Mot de passe invalide (8+ caractères, 1 majuscule, 1 chiffre, 1 spécial)";
  confirmPasswordError.value =
    password.value === confirmPassword.value ? null : "Les mots de passe ne correspondent pas";

  if (!emailError.value && !passwordError.value && !confirmPasswordError.value) {
    console.log("Inscription validée avec:", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
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
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9em;
}
</style>
