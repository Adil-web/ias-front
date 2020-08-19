<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label: {
      type: String
    },
    chartData: {
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
    // const years = this.chartData.map(d => d.year);
    // const expectancy = this.chartData.map(d => d.lifeExpectancy);
    // console.log(this.chartData)

    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor
    } = this.chartColors;

    let population = []
    for (const [key, value] of Object.entries(this.chartData)) {
                        population.push(`${value}`);
}

    this.renderChart(
      {
        labels: Object.keys(this.chartData),
        datasets: [
          {
            label: this.label,
            data: population,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
            pointBackgroundColor: pointBackgroundColor,
            backgroundColor: backgroundColor
          }
        ]
      }
    )
  }
};
</script>
