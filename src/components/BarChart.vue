<template>
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
      const backgroundColors = [
        '#63B3ED',
        '#68D391',
        '#F6E05E',
        '#FC8181',
        '#B794F4',
        '#A0AEC0',
        '#FBD38D',
        '#76E4B1',
        '#A3BFFA',
        '#FFAC99'
      ];

      return {
        labels: this.secondBySecond.map(s => `Segundo ${s.second}`),
        datasets: [
          {
            label: '% de Atención',
            data: this.secondBySecond.map(s => s.attention),
            backgroundColor: this.secondBySecond.map((_, index) => backgroundColors[index % backgroundColors.length]),
            borderColor: '#4A5568',
            borderWidth: 0
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
            grid: {
              color: '#4A5568',
              borderColor: '#4A5568'
            },
            ticks: {
              color: '#CBD5E0'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#CBD5E0'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#E2E8F0'
            }
          },
          title: {
            display: true,
            text: 'Nivel de Atención por Segundo',
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#E2E8F0',
            padding: {
                top: 10,
                bottom: 20
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
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += `${context.parsed.y}%`;
                }
                return label;
              }
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
  height: 600px; /* Aumentado para que el gráfico sea más grande */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
