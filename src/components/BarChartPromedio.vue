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
  name: 'BarChartPromedio',
  props: {
    dataPromedio: {
      type: Array,
      required: true
    }
  },
  computed: {
  chartData() {
    if (!this.dataPromedio || !Array.isArray(this.dataPromedio)) {
      return {
        labels: [],
        datasets: []
      }
    }

    return {
      labels: this.dataPromedio.map(s => `Segundo ${s.segundo}`),
      datasets: [{
        label: '% Atención Promedio',
        data: this.dataPromedio.map(s => Math.round(s.atencion_promedio * 100)),
        backgroundColor: '#63B3ED',
        borderColor: '#4A5568',
        borderWidth: 0
      }]
    }
  },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
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
