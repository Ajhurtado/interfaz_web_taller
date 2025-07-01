<template>
  <!-- NO definas altura aquí, déjaselo al contenedor padre -->
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  props: {
    secondBySecond: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.secondBySecond.map(s => `s${s.second}`),
        datasets: [
          {
            label: '% Atención',
            data: this.secondBySecond.map(s => s.attention),
            backgroundColor: '#42A5F5'
          }
        ]
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false, // 🔥 OBLIGATORIO
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Atención por segundo'
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
  height: 100%; /* toma el 100% del v-card */
  width: 100%;
}
</style>