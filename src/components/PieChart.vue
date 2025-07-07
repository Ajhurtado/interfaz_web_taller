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
  name: 'PieChart',
  props: ['attentionStats'],
  computed: {
  chartData() {
    if (
      !this.attentionStats ||
      typeof this.attentionStats.trueCount !== 'number' ||
      typeof this.attentionStats.falseCount !== 'number'
    ) {
      // Retorna un gráfico vacío si los datos no están disponibles
      return {
        labels: [],
        datasets: []
      }
    }

    return {
      labels: ['Atención Excelente (≥ 80%)', 'Atención Suficiente (< 80%)'],
      datasets: [
        {
          backgroundColor: ['#4CAF50', '#F44336'],
          data: [this.attentionStats.trueCount, this.attentionStats.falseCount],
          borderColor: '#2D3748',
          borderWidth: 2
        }
      ]
    }
  },
  options() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#E2E8F0'
          }
        },
        tooltip: {
          backgroundColor: '#4A5568',
          titleColor: '#E2E8F0',
          bodyColor: '#CBD5E0',
          borderColor: '#A0AEC0',
          borderWidth: 1,
          cornerRadius: 4,
          callbacks: {
            label: function (context) {
              const label = context.label || ''
              if (context.parsed !== null && context.dataset?.data?.length) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const value = context.parsed
                const percentage = ((value / total) * 100).toFixed(2) + '%'
                return `${label}: ${percentage} (${value})`
              }
              return label
            }
          }
        }
      }
    }
  }
},
  components: { Pie }
}
</script>

<style scoped>
.pie-container {
  height: 400px; /* Aumentado para que el gráfico sea más grande */
  width: 100%; /* Ocupará todo el ancho disponible de su contenedor */
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
