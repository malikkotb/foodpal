<template>
  <div>
    <!-- <canvas id="barChart"></canvas> -->

    <div class="container-fluid px-4">
      <h1 class="mt-4">Dashboard</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Work in Progress</li>
      </ol>

      
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-header">
              Calories Remaining
            </div>
            <div class="card-body">
              <canvas id="calorieChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-header">Macronutrients</div>
            <div class="card-body">
              <canvas id="macroChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>

      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-header">Weight</div>
            <div class="card-body">
              <canvas id="weightChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-header">
              Steps
            </div>
            <div class="card-body">
              <canvas id="exerciseChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
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

    const weightChart = new Chart(weight_chart, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Weight",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
      },
    });
    weightChart;

    const exerciseChart = new Chart(exercise_chart, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    exerciseChart;
  },
};
</script>

<style scoped>
.card-body {
  /* background-color: green; */
  height: 300px;
}
canvas {
  margin: 0 auto;
}
div {
  /* background-color: aqua; */
}
</style>
