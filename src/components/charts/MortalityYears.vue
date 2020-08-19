<script>
import { Line } from "vue-chartjs";

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
    this.chartData.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
    const years = this.chartData.map(d => d.year);
    const mortality = this.chartData.map(d => d.overallMortalityRate);
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
            data: mortality,
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
            pointBorderColor,
            pointBackgroundColor
            } = this.chartColors;

        this.renderChart(
        {
            labels: Chart.defaults.global.labels = this.chartData.map(d => d.year),
            datasets: [
            {
                label: this.label,
                data: Chart.defaults.global.labels = this.chartData.map(d => d.overallMortalityRate),
                borderColor: Chart.defaults.global.borderColor = 'rgb(85, 33, 97)',
                pointBorderColor: pointBorderColor,
                pointBackgroundColor: pointBackgroundColor,
                backgroundColor: Chart.defaults.global.backgroundColor = 'rgba(85, 33, 97, .7)'
            }
            ]
          }
      )
    }
  }
};
</script>
