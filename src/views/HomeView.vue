<template>
  <v-container fluid class="home-container d-flex flex-column align-center justify-center pa-6">
    <v-card class="logo-card pa-4 mb-8 rounded-circle elevation-6">
      <img alt="Vue logo" src="../assets/logo.png" class="vue-logo">
    </v-card>

    <HelloWorld msg="Bienvenido a tu Aplicación Vue.js"/>
  </v-container>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 64px);
  background-color: var(--v-theme-background); /* Fondo oscuro del tema */
  padding: 24px !important;
}

.logo-card {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #42b983, #42A5F5); /* Gradiente vibrante */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* Sombra más oscura para tema oscuro */
}

.vue-logo {
  max-width: 80%;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7)); /* Sombra más pronunciada en el logo */
}
</style>
