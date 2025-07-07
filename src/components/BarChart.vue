<template>
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChartIndividual',
  props: {
    dataIndividual: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      // Asegurarse que hay datos
      if (!Array.isArray(this.dataIndividual) || this.dataIndividual.length === 0) {
        return {
          labels: [],
          datasets: []
        }
      }

      const label = 'Atención (%)'
      const color = this.dataIndividual[0].color || '#999'

      return {
        labels: this.dataIndividual.map(s => `Segundo ${s.segundo}`),
        datasets: [
          {
            label,
            data: this.dataIndividual.map(s => Math.round(s.atencion * 100)),
            backgroundColor: color
          }
        ]
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        }
      }
    }
  },
  components: {
    Bar
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 600px;
  width: 100%;
}
</style>
