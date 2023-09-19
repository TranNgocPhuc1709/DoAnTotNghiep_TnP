<template src="./EColumnChart.html"></template>
<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12'
        ],
        datasets: [
          {
            label: 'Doanh Thu',
            backgroundColor: '#026b97',
            data: [40, 25, 12, 39, 10, 40, 39, 50, 30, 20, 12, 11],
          },
          {
            label: 'Chi phí',
            backgroundColor: '#e18314',
            data: [10, 66, 42, 36, 17, 44, 49, 45, 42, 24, 22, 31]
          },
          {
            label: 'Lợi nhuận',
            backgroundColor: '#6dab13',
            data: [19, 30, 52, 25, 40, 23, 32, 12, 23, 32, 53, 21]
          }
        ],
      },
      chartOptions: {
        responsive: true,
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context: any) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          },
          title: {
            display: true,
            text: 'Biểu đồ báo cáo doanh thu theo nhân viên',
            font: {
              size: 28
            }
          }
        }
      }
    }
  }
}
</script>