<template>
  <div>
    <!-- <canvas id="barChart"></canvas> -->

    <div class="container-fluid px-4">
      <h1 class="mt-4">Dashboard</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <h6>Get weight data in general and steps/exercise as well.</h6>
      <p>
        But the rest display only for the current day , so only display the date
        of the current day by retrieving data from firebase using
        today.getDate()
      </p>
      <p>
        Generate effects for adding food and deleting food (transitions), like
        the card comes in from the left and slides out through the right AND
        when you hover over a card it zooms in a little and then you can press
        on the card to see the details of that food item
      </p>

      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              Calorie Ring Remaining = Goal - Food Chartjs Dougnhut Chart
            </div>
            <div class="card-body">
              <canvas id="calorieChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">Macros -> 1 Doughnut Charts</div>
            <div class="card-body">
              <canvas id="macroChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">Line Chart -> Weight - Last 30 days</div>
            <div class="card-body">
              <canvas id="weightChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              Steps (can be added just like food in the diary section)
            </div>
            <div class="card-body">
              <canvas id="exerciseChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  mounted() {
    // const ctx = document.getElementById("barChart");
    const calorie_chart = document.getElementById("calorieChart");
    const macro_chart = document.getElementById("macroChart");
    const weight_chart = document.getElementById("weightChart");
    const exercise_chart = document.getElementById("exerciseChart");

    // bar chart
    // const barChart = new Chart(ctx, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
    // barChart;

    const calorieChart = new Chart(calorie_chart, {
      type: "doughnut",
      data: {
        labels: ["Calories Used", "Calories Remaining"],
        datasets: [
          {
            label: "Calories",
            data: [
              { label: "Label 1", value: 80 },
              { label: "Label 2", value: 20 },
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
      },
    });
    calorieChart;

    const macroChart = new Chart(macro_chart, {
      type: "doughnut",
      data: {
        labels: ["Fat", "Protein", "Carbohydrates"],
        datasets: [
          {
            label: "Macros",
            data: [
              { label: "Label 1", value: 10 },
              { label: "Label 2", value: 20 },
              { label: "Label 3", value: 30 },
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
      },
    });
    macroChart;

    const config = {
      type: "line",
      data: data,
    };

    const weightChart = new Chart(weight_chart, {
      type: "line",
      data: {
        labels: Utils.months({ count: 7 }),
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
      },
    });
    weightChart;

    // Pie chart
    // const pieChart = new Chart(ctz, {
    //   type: "pie",
    //   data: {
    //     // labels: ["Red", "Blue", "Yellow"],
    //     datasets: [
    //       {
    //         label: "My First Dataset",
    //         data: [300, 50, 100],
    //         backgroundColor: [
    //           "rgb(255, 99, 132)",
    //           "rgb(54, 162, 235)",
    //           "rgb(255, 205, 86)",
    //         ],
    //         hoverOffset: 4,
    //       },
    //     ],
    //   },
    //   options: {},
    // });
    // pieChart;
  },
};
</script>

<style scoped>
.pie_chart,
.card-body {
  height: 300px;
  width: 300px;
}
div {
  /* background-color: aqua; */
}
</style>
