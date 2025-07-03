<template>
  <v-container fluid class="dashboard-container pa-6">
    <v-row>
      <!-- Filtro de Grupo -->
      <v-col cols="12">
        <v-card class="pa-4 mb-6 rounded-lg elevation-4">
          <h2 class="text-h6 text-center mb-4 text-primary">Filtro de Grupo</h2>
          <GroupFilter :groups="groupNames" @groupSelected="loadGroupData" />
        </v-card>
      </v-col>

      <!-- Gráficos individuales si se selecciona un grupo específico -->
      <template v-if="selectedGroup !== 'Todos los grupos' && selectedGroup">
        <v-col cols="12">
          <v-card class="pa-4 rounded-lg elevation-4">
            <h2 class="text-h6 text-center mb-4 text-primary">Estadísticas de Atención</h2>
            <PieChart :attentionStats="attentionStats" />
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-4 rounded-lg elevation-4 dashboard-bar-chart-card">
            <BarChart :secondBySecond="secondBySecond" />
          </v-card>
        </v-col>
      </template>

      <!-- Mostrar todos los grupos -->
      <template v-if="selectedGroup === 'Todos los grupos'">
        <v-col
          v-for="group in groupDataList"
          :key="group.groupName"
          cols="12"
        >
          <v-card class="pa-4 mb-6 rounded-lg elevation-4">
            <h3 class="text-h6 mb-4 text-primary text-center">
              {{ group.groupName }}
            </h3>
            <PieChart :attentionStats="group.attentionStats" />
            <div class="mt-4" style="height: 600px;">
              <BarChart :secondBySecond="group.secondBySecond" />
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import GroupFilter from '@/components/GroupFilter.vue'
import { consultarMatriculaDatosFachada } from '@/client/ConsumirAPI.js'

const selectedGroup = ref('')
const groupDataList = ref([]) // todos los datos

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const secondBySecond = ref([])

onMounted(async () => {
  groupDataList.value = await consultarMatriculaDatosFachada()
})

// Genera los nombres reales de los grupos dinámicamente
const groupNames = computed(() => [
  'Todos los grupos',
  ...groupDataList.value.map(g => g.groupName)
])

function loadGroupData(groupName) {
  selectedGroup.value = groupName

  if (groupName === 'Todos los grupos') {
    attentionStats.value = { trueCount: 0, falseCount: 0 }
    secondBySecond.value = []
    return
  }

  const grupo = groupDataList.value.find(g => g.groupName === groupName)
  if (grupo) {
    attentionStats.value = grupo.attentionStats
    secondBySecond.value = grupo.secondBySecond
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
