<template>
  <div class="pie-container">
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Tooltip, Legend, ArcElement)

export default {
  props: ['attentionStats'], // { trueCount: 20, falseCount: 10 }
  computed: {
    chartData() {
      return {
        labels: ['Atención ≥ 80%', 'Atención < 80%'],
        datasets: [
          {
            backgroundColor: ['#4CAF50', '#F44336'],
            data: [this.attentionStats.trueCount, this.attentionStats.falseCount],
          }
        ]
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: { Pie }
}
</script>

<style scoped>
.pie-container {
  height: 300px; /* Altura fija necesaria para evitar crecimiento infinito */
  width: 300px;  /* Puedes ajustar a tu gusto */
  margin: auto;
}
</style>
