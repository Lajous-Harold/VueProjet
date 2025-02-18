<template>
  <div class="not-found">
    <h1>404 - Page non trouvée</h1>
    <p>Oups ! La page que vous recherchez n'existe pas.</p>
    <router-link to="/" class="home-link">Retour à l'accueil</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2em;
  color: #d9534f;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.home-link:hover {
  background-color: #0056b3;
}
</style>
