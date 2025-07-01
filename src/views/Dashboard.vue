<template>
  <v-container fluid class="dashboard-container pa-6">
    <v-row>
      <!-- Filtro de Grupo - Ocupa todo el ancho -->
      <v-col cols="12">
        <v-card class="pa-4 mb-6 rounded-lg elevation-4">
          <h2 class="text-h6 text-center mb-4 text-primary">Filtro de Grupo</h2>
          <GroupFilter @groupSelected="loadGroupData" />
        </v-card>
      </v-col>

      <!-- Gráfico de Pastel - Ocupa todo el ancho, debajo del filtro -->
      <v-col cols="12">
        <v-card class="pa-4 rounded-lg elevation-4">
          <h2 class="text-h6 text-center mb-4 text-primary">Estadísticas de Atención</h2>
          <PieChart :attentionStats="attentionStats" />
        </v-card>
      </v-col>

      <!-- Gráfico de Barras - Ocupa todo el ancho, debajo del gráfico de pastel -->
      <v-col cols="12">
        <v-card class="pa-4 rounded-lg elevation-4 dashboard-bar-chart-card">
          <BarChart :secondBySecond="secondBySecond" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import GroupFilter from '@/components/GroupFilter.vue'
import { getMockGroupData } from '@/services/mockDataService' // <-- ¡CORREGIDO AQUÍ!

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const secondBySecond = ref([])

async function loadGroupData(groupId) {
  try {
    const data = await getMockGroupData(groupId)
    attentionStats.value = data.attentionStats
    secondBySecond.value = data.secondBySecond
  } catch (error) {
    console.error("Error al cargar los datos del grupo:", error);
  }
}
</script>

<style scoped>
.dashboard-container {
  min-height: calc(100vh - 64px);
  background-color: var(--v-theme-background);
  padding: 24px !important;
}

/* La altura del gráfico de barras ahora se controla dentro de BarChart.vue,
   así que esta regla puede ser eliminada o ajustada si necesitas un control
   adicional sobre la tarjeta contenedora. */
.dashboard-bar-chart-card {
  /* height: 500px; */ /* Ya no es estrictamente necesario aquí si BarChart.vue lo maneja */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-primary {
  color: var(--v-theme-primary) !important;
}
</style>
