<template>
  <v-container fluid class="about-container d-flex align-center justify-center pa-6">
    <v-card class="pa-6 rounded-lg elevation-4 text-center" max-width="600">
      <h1 class="text-h4 mb-4 text-primary">Acerca de esta Aplicación</h1>
      <p class="text-body-1 text-medium-emphasis">
        Esta es una página de ejemplo para demostrar las capacidades de diseño y visualización de datos.
        Aquí puedes encontrar información sobre el propósito de la aplicación, sus características principales,
        o cualquier detalle relevante para los usuarios.
      </p>
      <p class="text-body-2 mt-4 text-grey-darken-1">
        Desarrollado con Vue.js y Vuetify.
      </p>
    </v-card>
  </v-container>
</template>

<style scoped>
.about-container {
  min-height: calc(100vh - 64px);
  background-color: var(--v-theme-background); /* Fondo oscuro del tema */
  padding: 24px !important;
}

.text-primary { color: var(--v-theme-primary) !important; }
</style>
