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

      <!-- Si se selecciona un grupo específico -->
      <template v-if="selectedGroup !== 'Todos los grupos' && selectedGroup">
        <!-- Gráfico de pastel (atención promedio) -->
        <v-col cols="12">
          <v-card class="pa-4 mb-6 rounded-lg elevation-4">
            <h2 class="text-h6 text-center text-primary mb-4">Atención Promedio - Gráfico de Pastel</h2>
            <PieChart :attentionStats="attentionStats" />
          </v-card>
        </v-col>

        <!-- Gráfico de barras del promedio por segundo -->
        <v-col cols="12">
          <v-card class="pa-4 mb-6 rounded-lg elevation-4">
            <h2 class="text-h6 text-center text-primary mb-4">Atención Promedio por Segundo</h2>
            <BarChartPromedio :dataPromedio="generalSecondBySecond" />
          </v-card>
        </v-col>

        <!-- Gráficos individuales por persona -->
        <v-col
          v-for="(datos, personaId) in personas"
          :key="personaId"
          cols="12"
        >
          <v-card class="pa-4 mb-6 rounded-lg elevation-4">
            <h2 class="text-h6 text-center text-primary mb-4">
              Atención de {{ personaId }}
            </h2>
            <BarChartIndividual :dataIndividual="datos" />
          </v-card>
        </v-col>
      </template>

      <!-- Si se selecciona "Todos los grupos" -->
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
            <div class="mt-4" style="height: 800px;">
              <BarChartPromedio :dataPromedio="group.promedioPorSegundo" />
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BarChartPromedio from '@/components/BarChartPromedio.vue'
import BarChartIndividual from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import GroupFilter from '@/components/GroupFilter.vue'
import { consultarMatriculaDatosFachada,transformarDatosPorPersona } from '@/client/ConsumirAPI.js'

const selectedGroup = ref('')
const groupDataList = ref([])

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const generalSecondBySecond = ref([]) // atención promedio por segundo
const personas = ref({}) // atención individual por persona

onMounted(async () => {
  groupDataList.value = await consultarMatriculaDatosFachada()
})

const groupNames = computed(() => [
  'Todos los grupos',
  ...groupDataList.value.map(g => g.groupName)
])

function loadGroupData(groupName) {
  selectedGroup.value = groupName

  if (groupName === 'Todos los grupos') {
    attentionStats.value = { trueCount: 0, falseCount: 0 }
    generalSecondBySecond.value = []
    personas.value = {}
    return
  }

  const grupo = groupDataList.value.find(g => g.groupName === groupName)
  if (grupo) {
    attentionStats.value = grupo.attentionStats
    generalSecondBySecond.value = grupo.promedioPorSegundo

    // ✅ Corregimos aquí para usar los "segundos" reales
    personas.value = transformarDatosPorPersona(grupo.segundos)
  }
}
</script>

<style scoped>
.dashboard-container {
  min-height: calc(100vh - 64px);
  background-color: var(--v-theme-background);
  padding: 24px !important;
}

.text-primary {
  color: var(--v-theme-primary) !important;
}
</style>
