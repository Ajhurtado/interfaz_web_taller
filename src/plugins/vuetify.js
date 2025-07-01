// main.js o plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const customTheme = {
  dark: true,
  colors: {
    primary: '#63B3ED',
    secondary: '#A0AEC0',
    accent: '#68D391',
    error: '#FC8181',
    info: '#63B3ED',
    success: '#4CAF50',
    warning: '#F6E05E',
    background: '#1A202C', // Fondo general oscuro
    surface: '#2C3545' // ¡Color de superficie de las tarjetas ajustado para ser más claro y sutil!
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
