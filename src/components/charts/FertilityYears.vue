<script>
import { Line } from "vue-chartjs";

Chart.defaults.global.legend.display = true;
Chart.defaults.global.defaultFontSize = 9
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = true;

export default {
    extends: Line,
  props: {
      label: {
          type: String
    },
    chartData: {
        type: Array
    },
    options: {
        type: Object
    },
    chartColors: {
        type: Object
    }
  },
  mounted() {
    // this.chartData.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
    const years = this.chartData.map(d => d.year);
    const fertility = this.chartData.map(d => d.fertility);
    // console.log(this.chartData)

    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor
    } = this.chartColors;

    this.renderChart(
      {
        labels: years,
        datasets: [
          {
            label: this.label,
            data: fertility,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          }
        ]
      }
    )
  },
  watch: {
    chartData(newData) {
        this.chartData = newData
        const {
            borderColor,
            pointBorderColor,
            pointBackgroundColor
            } = this.chartColors;

        this.renderChart(
        {
            labels: Chart.defaults.global.labels = this.chartData.map(d => d.year),
            datasets: [
            {
                label: this.label,
                data: Chart.defaults.global.labels = this.chartData.map(d => d.fertility),
                borderColor: borderColor,
                pointBorderColor: pointBorderColor,
                pointBackgroundColor: pointBackgroundColor,
                backgroundColor: Chart.defaults.global.backgroundColor = 'rgba(1, 184, 170, .6)'
            }
            ]
          }
      )
    }
  }
//   watch: {
//     chartData() {
//         this.chartData.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
//         const years = this.chartData.map(d => d.year);
//         const fertility = this.chartData.map(d => d.fertility);

//         Chart.defaults.global.labels = years
//         Chart.defaults.global.datasets.data = fertility
//     }
//   }
};
</script>
