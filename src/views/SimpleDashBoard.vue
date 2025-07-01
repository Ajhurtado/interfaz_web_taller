<template>
  <v-container fluid>
    <div style="max-width: 900px; margin: auto;">
      <GroupFilter @groupSelected="loadGroupData" />
      <PieChart :attentionStats="attentionStats" />
      <div style="height: 400px; margin-top: 16px;">
        <BarChart :secondBySecond="secondBySecond" />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import GroupFilter from '@/components/GroupFilter.vue'
import BarChart from '@/components/BarChart.vue'
import { getMockGroupData } from '@/services/mockDataService'

const attentionStats = ref({ trueCount: 0, falseCount: 0 })
const secondBySecond = ref([])

async function loadGroupData(groupId) {
  const data = await getMockGroupData(groupId)
  attentionStats.value = data.attentionStats
  secondBySecond.value = data.secondBySecond
}
</script>
