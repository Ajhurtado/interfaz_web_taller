<template>
  <v-container fluid class="dashboard-container">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <GroupFilter @groupSelected="loadGroupData" />
          <PieChart :attentionStats="attentionStats" />
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
          <BarChart :secondBySecond="secondBySecond" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
import GroupFilter from '@/components/GroupFilter.vue'
import { getMockGroupData } from '@/services/mockDataService'

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const secondBySecond = ref([])

async function loadGroupData(groupId) {
  const data = await getMockGroupData(groupId)
  attentionStats.value = data.attentionStats
  secondBySecond.value = data.secondBySecond
}
</script>

<style scoped>
.dashboard-container {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
