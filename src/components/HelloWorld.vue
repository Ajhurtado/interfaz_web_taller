<template>
  <v-container class="hello-container">
    <v-card class="pa-6 rounded-lg elevation-4">
      <h1 class="text-h4 text-center mb-6">{{ msg }}</h1>

      <p class="text-body-1 text-center mb-8">
        Para una guía y recetas sobre cómo configurar / personalizar este proyecto,<br>
        visita la
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-primary">documentación de vue-cli</a>.
      </p>

      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <h3 class="text-h6 mb-3 text-secondary">Plugins CLI Instalados</h3>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>
                <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" class="text-decoration-none text-info">babel</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener" class="text-decoration-none text-info">router</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank" rel="noopener" class="text-decoration-none text-info">unit-jest</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <h3 class="text-h6 mb-3 text-secondary">Enlaces Esenciales</h3>
          <v-list dense>
            <v-list-item>
              <v-list-item-title>
                <a href="https://vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-info">Core Docs</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://forum.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-info">Forum</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://chat.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-info">Community Chat</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://twitter.com/vuejs" target="_blank" rel="noopener" class="text-decoration-none text-info">Twitter</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="https://news.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-info">News</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <div class="text-center mt-8">
        <h3 class="text-h6 mb-3 text-secondary">Ecosistema</h3>
        <v-chip-group column>
          <v-chip class="ma-2" color="blue-lighten-2" label>
            <a href="https://router.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-white">vue-router</a>
          </v-chip>
          <v-chip class="ma-2" color="green-lighten-2" label>
            <a href="https://vuex.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-white">vuex</a>
          </v-chip>
          <v-chip class="ma-2" color="purple-lighten-2" label>
            <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" class="text-decoration-none text-white">vue-devtools</a>
          </v-chip>
          <v-chip class="ma-2" color="orange-lighten-2" label>
            <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" class="text-decoration-none text-white">vue-loader</a>
          </v-chip>
          <v-chip class="ma-2" color="red-lighten-2" label>
            <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" class="text-decoration-none text-white">awesome-vue</a>
          </v-chip>
        </v-chip-group>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello-container {
  max-width: 960px;
  margin-top: 40px;
  margin-bottom: 40px;
}

/* Usamos las variables CSS de Vuetify para los colores */
.text-primary { color: var(--v-theme-primary) !important; }
.text-secondary { color: var(--v-theme-secondary) !important; }
.text-info { color: var(--v-theme-info) !important; }

.v-chip a {
  text-decoration: none;
}
</style>
