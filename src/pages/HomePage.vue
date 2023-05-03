<template>
  <div>
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4">Dashboard</h1>
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        
        <!-- <div class="row">
          <div class="col-xl-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-area me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-area"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm96 288H448c17.7 0 32-14.3 32-32V251.8c0-7.6-2.7-15-7.7-20.8l-65.8-76.8c-12.1-14.2-33.7-15-46.9-1.8l-21 21c-10 10-26.4 9.2-35.4-1.6l-39.2-47c-12.6-15.1-35.7-15.4-48.7-.6L135.9 215c-5.1 5.8-7.9 13.3-7.9 21.1v84c0 17.7 14.3 32 32 32z"
                  ></path></svg
                >
                Area Chart Example
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myAreaChart"
                  width="438"
                  height="175"
                  style="display: block; width: 438px; height: 175px"
                  class="chartjs-render-monitor"
                ></canvas>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-bar me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-bar"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path></svg
                >
                Bar Chart Example
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myBarChart"
                  width="438"
                  height="175"
                  class="chartjs-render-monitor"
                  style="display: block; width: 438px; height: 175px"
                ></canvas>
              </div>
            </div>
          </div>
        </div> -->

        <!-- First Row Dashobard Data Start -->

        <div class="row">
          <div class="col-xl-4 col-md-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-bar me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-bar"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path>
                </svg>
                Calorie Ring Remaining = Goal - Food
                Chartjs Dougnhut Chart
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myBarChart"
                  width="438"
                  height="175"
                  class="chartjs-render-monitor"
                  style="display: block; width: 438px; height: 175px"
                ></canvas>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-bar me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-bar"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path>
                </svg>
               Macros -> 1 Doughnut Charts 
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myBarChart"
                  width="438"
                  height="175"
                  class="chartjs-render-monitor"
                  style="display: block; width: 438px; height: 175px"
                ></canvas>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-bar me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-bar"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path>
                </svg>
                Heart Healthy Bar Chart Sideways
                Amounts today: Fat, Sodium, Cholesterol
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myBarChart"
                  width="438"
                  height="175"
                  class="chartjs-render-monitor"
                  style="display: block; width: 438px; height: 175px"
                ></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- First Row Dashobard Data End -->


        <div class="row">
          <div class="col-xl-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-area me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-area"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm96 288H448c17.7 0 32-14.3 32-32V251.8c0-7.6-2.7-15-7.7-20.8l-65.8-76.8c-12.1-14.2-33.7-15-46.9-1.8l-21 21c-10 10-26.4 9.2-35.4-1.6l-39.2-47c-12.6-15.1-35.7-15.4-48.7-.6L135.9 215c-5.1 5.8-7.9 13.3-7.9 21.1v84c0 17.7 14.3 32 32 32z"
                  ></path></svg
                >
                Area Chart Example
                -> Weight - Last 90 days
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myAreaChart"
                  width="438"
                  height="175"
                  style="display: block; width: 438px; height: 175px"
                  class="chartjs-render-monitor"
                ></canvas>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card mb-4">
              <div class="card-header">
                <svg
                  class="svg-inline--fa fa-chart-bar me-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-bar"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  ></path></svg
                >
                Steps (can be added just like food in the diary section)
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas
                  id="myBarChart"
                  width="438"
                  height="175"
                  class="chartjs-render-monitor"
                  style="display: block; width: 438px; height: 175px"
                ></canvas>
              </div>
            </div>
          </div>
        </div>



      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  /* background-color: aqua; */
}
</style>
