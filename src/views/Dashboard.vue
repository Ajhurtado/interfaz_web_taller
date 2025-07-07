<template>
  <v-container fluid class="dashboard-container pa-6">
    <v-row>
      <!-- Filtro de Grupo + Botón Actualizar -->
      <v-col cols="12">
        <v-card class="pa-4 mb-6 rounded-lg elevation-4">
          <div class="d-flex align-center justify-space-between">
            <h2 class="text-h6 text-primary">Filtro de Grupo</h2>
            <v-btn color="primary" @click="actualizarGruposDesdeCatalogo">Actualizar</v-btn>
          </div>
          <GroupFilter :groups="groupNames" @groupSelected="loadGroupData" />
        </v-card>
      </v-col>

      <!-- Si se selecciona un grupo específico -->
      <template v-if="selectedGroup !== 'Todos los grupos' && selectedGroup">
        <!-- Gráfico de pastel -->
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

      <!-- Vista para "Todos los grupos" -->
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
import axios from 'axios'

import PieChart from '@/components/PieChart.vue'
import BarChartPromedio from '@/components/BarChartPromedio.vue'
import BarChartIndividual from '@/components/BarChart.vue'
import GroupFilter from '@/components/GroupFilter.vue'
import { transformarDatosGrupo, transformarDatosPorPersona } from '@/client/transformaciones.js'
import { consultarMatriculaDatosFachada } from '@/client/ConsumirAPI.js'

const selectedGroup = ref('')
const archivosDisponibles = ref([]) // nombres del filtro dinámico
const groupDataList = ref([])       // todos los datos de grupos (opcional para "Todos los grupos")

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const generalSecondBySecond = ref([])
const personas = ref({})

// Computed para el filtro
const groupNames = computed(() => ['Todos los grupos', ...archivosDisponibles.value])

// Función para actualizar lista de archivos desde /catalogoarchivos
async function actualizarGruposDesdeCatalogo() {
  try {
    const res = await axios.get('http://localhost:8081/api/atencion/v1/archivosjson/catalogoarchivos')
    archivosDisponibles.value = res.data.map(nombre => nombre.replace('.json', ''))
  } catch (err) {
    console.error("Error al obtener nombres de archivos:", err)
  }
}

// Función principal para cargar datos de un grupo
async function loadGroupData(groupName) {
  selectedGroup.value = groupName

  if (groupName === 'Todos los grupos') {
    attentionStats.value = { trueCount: 0, falseCount: 0 }
    generalSecondBySecond.value = []
    personas.value = {}
    return
  }

  try {
    const url = `http://localhost:8081/api/atencion/v1/archivosjson/${groupName}.json`
    const res = await axios.get(url)

    // Puede venir como string, intenta parsear si es necesario
    const rawData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data

    const grupo = transformarDatosGrupo({ [groupName]: rawData }, groupName)
    const individual = transformarDatosPorPersona(rawData)

    attentionStats.value = grupo.attentionStats
    generalSecondBySecond.value = grupo.promedioPorSegundo
    personas.value = individual
  } catch (err) {
    console.error("Error al cargar datos del grupo:", err)
  }
}

// Al iniciar: consultar archivos disponibles y cargar todos los datos si se requiere
onMounted(async () => {
  await actualizarGruposDesdeCatalogo()
  groupDataList.value = await consultarMatriculaDatosFachada() // solo para "Todos los grupos"
})
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
