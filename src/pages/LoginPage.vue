<template>
  <main>
    <section></section>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";

const formData = ref({
  fields: [
    {
      id: "email",
      placeholder: "Entrez votre email",
      type: "email",
    },
    {
      id: "password",
      placeholder: "Entrez votre mot de passe",
      type: "password",
    },
  ],
  buttons: [
    {
      text: "Connexion",
      type: "submit",
    },
    {
      text: "S'inscrire",
      type: "button",
    },
  ],
});
</script>
<style></style>
