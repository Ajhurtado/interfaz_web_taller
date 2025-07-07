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

    const backgroundColors = this.dataPromedio.map(s => {
    const porcentaje = Math.round(s.atencion_promedio * 100)

      if (porcentaje === 100) {
        return '#1E3A8A' // azul muy oscuro
      } else if (porcentaje >= 50 && porcentaje < 100) {
        return '#284fbf' // azul medio
      } else if (porcentaje >= 10 && porcentaje < 50) {
        return '#3365f5' // azul claro
      } else {
        return 'rgba(0,0,0,0)' // 0% no visible
      }
    })

    return {
      labels: this.dataPromedio.map(s => `Segundo ${s.segundo}`),
      datasets: [{
        label: '% Atención Promedio',
        data: this.dataPromedio.map(s => Math.round(s.atencion_promedio * 100)),
        backgroundColor: backgroundColors,
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
            max: 100,
            ticks: {
              stepSize: 10
            }
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
