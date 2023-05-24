<template>
  <div style="background-color: #f8f9fa">
    <!-- <div v-if="showCard" class="card">
      <div class="card-body">
        <button @click="closeCard()">Close</button>
      </div>
    </div> -->

    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <!-- TODO: add picture
    from nutritionix api -->

    <!-- addFoodCard -->
    <div v-show="showCard" class="card">
      <div class="card-header">
        <h4 class="mb-0" style="text-align: center">{{ addCategory }}</h4>
      </div>
      <div class="card-body px-4 pb-0">
        <div class="row">
          <div class="mb-0 col-md-6 addFoodCol">
            <!-- <label for="inputField" class="form-label">Input Field</label> -->
            <input
              type="text"
              class="form-control"
              id="inputField"
              v-model="inputValue"
              placeholder="Search..."
            />
            <div class="scrollable-list">
              <ul>
                <li
                  v-for="(item, index) in filteredList"
                  :key="index"
                  @click="selectItem(index, item)"
                  :class="{ selected: index === selectedItem }"
                >
                  {{ item.foodName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-0 col-md-6 addFoodCol">
            <div class="relative">
              <canvas ref="myChart" class="mx-0" id="macrosChart"></canvas>
              <div class="absolute-center text-center">
                <p style="font-size: 1.2rem" v-if="selectedItem > -1">
                  <strong>{{ selectedItemToAdd.calories }}</strong>
                </p>
                <p v-if="selectedItem > -1">cal</p>
              </div>
            </div>

            <div v-if="selectedItemToAdd">
              <p>
                <strong>{{ selectedItemToAdd.foodName }}</strong>
              </p>
              <!-- <p>Calories: <strong>{{ selectedItemToAdd.calories }}</strong></p> -->
              <p>
                Carbohydrate:
                <span style="float: right">
                  <strong
                    >{{
                      selectedItemToAdd.macronutrients.carbohydrates
                    }}g</strong
                  ></span
                >
              </p>
              <p>
                Fat:
                <span style="float: right">
                  <strong>{{ selectedItemToAdd.macronutrients.fat }}g</strong>
                </span>
              </p>
              <p>
                Protein:
                <span style="float: right">
                  <strong
                    >{{ selectedItemToAdd.macronutrients.protein }}g</strong
                  >
                </span>
              </p>
              <p>
                Serving Size:
                <span style="float: right">
                  <strong>{{ selectedItemToAdd.unit }}</strong>
                </span>
              </p>
              <!-- TODO: make number of servings input field and multiply the macros and
              calories and serving size accordingly to the # of Servings e.g. 1.5 * 100g -->
              <p>
                Servings:<input
                  v-model="numServings"
                  type="text"
                  style="width: 50px; float: right"
                />
              </p>
            </div>
            <h3 v-else class="text-center">Search for a food</h3>
          </div>
        </div>
      </div>
      <button
        class="addFoodBtn"
        v-bind:disabled="!(selectedItem > -1)"
        @click="closeCard"
      >
        Add
      </button>
    </div>

    <div v-show="showDetailsFood" class="macroCard">
      <p style="text-align: center">
        <strong>{{ selectedFood ? selectedFood.foodName : "Loading" }}</strong>
      </p>
      <p class="aligned-p">
        <span class="left-text">Calories:</span
        ><span class="right-text"
          ><strong
            >{{ selectedFood ? selectedFood.calories : "Loading" }} cal</strong
          ></span
        >
      </p>
      <p class="aligned-p">
        <span class="left-text">Carbohydrates:</span
        ><span class="right-text"
          ><strong
            >{{
              selectedFood
                ? selectedFood.macronutrients.carbohydrates
                : "Loadin"
            }}g</strong
          ></span
        >
      </p>
      <p class="aligned-p">
        <span class="left-text">Fat:</span
        ><span class="right-text"
          ><strong
            >{{
              selectedFood ? selectedFood.macronutrients.fat : "Loadin"
            }}g</strong
          ></span
        >
      </p>
      <p class="aligned-p">
        <span class="left-text">Protein:</span
        ><span class="right-text"
          ><strong
            >{{
              selectedFood ? selectedFood.macronutrients.protein : "Loadin"
            }}g</strong
          ></span
        >
      </p>
      <p class="aligned-p">
        <span class="left-text">Serving:</span
        ><span class="right-text"
          ><strong>{{
            selectedFood ? selectedFood.unit : "Loading"
          }}</strong></span
        >
      </p>
      <button
        @click="closeMacroCard"
        type="button"
        class="btn btn-success text-center"
      >
        Okay
      </button>
    </div>

    <!-- carousel -->
    <div
      id="carouselExampleDark"
      class="carousel carousel-dark slide p-4"
      data-bs-ride="false"
      style="background-color: #f8f9fa"
    >
      <div ref="carousel" class="carousel-inner">
        <!-- TODO: bind the :class to active if todays' date is that date -->
        <!-- <div class="carousel-item active">
          <h5>Today 2. May 23</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div> -->
        <div
          v-for="(date, index) in dateList"
          :key="index"
          :class="{ 'carousel-item': true, active: index === activeSlide }"
        >
          <h5>{{ date }}</h5>
          <!-- <h3>{{ index }}</h3> -->
        </div>
      </div>
      <!-- carousel controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
        @click="updateActiveSlide('-')"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
        @click="updateActiveSlide('+')"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      <!-- carousel controls end-->
    </div>

    <div class="container px-0">
      <div class="row">
        <div class="col-1">
          <!-- First column -->
        </div>
        <div class="col-10 px-0">
          <!-- Middle column -->
          <div style="background-color: #f8f9fa">
            <div class="diary">
              <div class="caloriesRemaining mt-0 mb-2 mx-3 px-3 py-4">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p class="mb-2">Calories Remaining</p>
                  <p class="text-end">
                    {{ dateList.at(activeSlide) }}
                  </p>
                </div>
                <div class="calTotalDay">
                  <h6 class="calTotalText">
                    300__ - 2543___ + 300_______ = ____400_____
                  </h6>
                  <p class="calSubtext">Goal Food Exercise Remaining</p>
                </div>
              </div>

              <!-- Breakfast -->
              <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Breakfast</strong></p>
                  <p class="text-end">
                    {{ isUpdated ? calorieTotals("bf") : "Loading calories" }}
                  </p>
                </div>
                <p class="subtext">
                  {{ isUpdated ? macrosMeal("bf") : "Loading Macros" }}
                </p>
              </div>
              <div
                v-for="item in breakfastItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                style="cursor: pointer; pointer-events: auto"
              >
                <div>
                  <p>{{ item.foodName }}</p>
                  <p class="subtext m-0">{{ item.unit }}</p>
                </div>
                <div class="text-end">
                  <p>{{ item.calories }}</p>
                </div>
              </div>
              <!-- Add Food for breakfast -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('bf')" class="addEntryBtn">
                  Add Food
                </button>
              </div>

              <!-- Lunch -->
              <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Lunch</strong></p>
                  <p class="text-end">
                    {{ isUpdated ? calorieTotals("lunch") : "10000" }}
                  </p>
                </div>
                <p class="subtext">
                  {{ isUpdated ? macrosMeal("lunch") : "Loading Macros" }}
                </p>
              </div>
              <div
                v-for="item in lunchItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                style="cursor: pointer; pointer-events: auto"
              >
                <div>
                  <p>{{ item.foodName }}</p>
                  <p class="subtext m-0">{{ item.unit }}</p>
                </div>
                <div class="text-end">
                  <p>{{ item.calories }}</p>
                </div>
              </div>
              <!-- Add Food for Lunch -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('lunch')" class="addEntryBtn">
                  Add Food
                </button>
              </div>

              <!-- Dinner -->
              <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Dinner</strong></p>
                  <p class="text-end">
                    {{ isUpdated ? calorieTotals("dinner") : "10000" }}
                  </p>
                </div>
                <p class="subtext">
                  {{ isUpdated ? macrosMeal("dinner") : "Loading Macros" }}
                </p>
              </div>
              <div
                v-for="item in dinnerItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                style="cursor: pointer; pointer-events: auto"
              >
                <div>
                  <p>{{ item.foodName }}</p>
                  <p class="subtext m-0">{{ item.unit }}</p>
                </div>
                <div class="text-end">
                  <p>{{ item.calories }}</p>
                </div>
              </div>
              <!-- Add Food for dinner -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('dinner')" class="addEntryBtn">
                  Add Food
                </button>
              </div>

              <!-- Snacks -->
              <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Snacks</strong></p>

                  <p class="text-end">
                    {{ isUpdated ? calorieTotals("snacks") : "10000" }}
                  </p>
                </div>
                <p class="subtext">
                  {{ isUpdated ? macrosMeal("snacks") : "Loading Macros" }}
                </p>
              </div>
              <div
                v-for="item in snackItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                style="cursor: pointer; pointer-events: auto"
              >
                <div>
                  <p>{{ item.foodName }}</p>
                  <p class="subtext m-0">{{ item.unit }}</p>
                </div>
                <div class="text-end">
                  <p>{{ item.calories }}</p>
                </div>
              </div>
              <!-- Add Food for Snacks -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('snacks')" class="addEntryBtn">
                  Add Food
                </button>
              </div>

              <!-- Exercise -->
              <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Exercises</strong></p>
                  <p class="text-end">
                    {{ isUpdated ? calorieTotals("exercise") : "10000" }}
                  </p>
                </div>
                <p class="subtext" style="color: red">
                  <strong>Change this</strong>
                </p>
              </div>
              <div
                v-for="item in exerciseItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <div>
                  <p>{{ item.exerciseName }}</p>
                  <p class="subtext m-0">{{ item.duration }}</p>
                </div>
                <div class="text-end">
                  <p>{{ item.caloriesBurned }}</p>
                </div>
              </div>
              <!-- Add Execise -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('exercise')" class="addEntryBtn">
                  Add Exercise
                </button>
              </div>

              <!-- Totals -->
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 align-items-center"
              >
                <p><strong>Totals</strong></p>
                <!-- <p>{{ foodItem && foodItem.snacks ? foodItem.snacks : 'No snack data available' }}</p> -->
                <div class="tableContainer">
                  <table class="text-center">
                    <tr>
                      <th></th>
                      <th>Calories</th>
                      <th>Carbohydrates</th>
                      <th>Fat</th>
                      <th>Protein</th>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>1000</td>
                      <td>150g</td>
                      <td>40g</td>
                      <td>80g</td>
                    </tr>
                    <tr>
                      <td>Daily Goal</td>
                      <td>2000</td>
                      <td>200g</td>
                      <td>60g</td>
                      <td>100g</td>
                    </tr>
                    <tr>
                      <td>Left</td>
                      <td>1000</td>
                      <td>50g</td>
                      <td>20g</td>
                      <td>20g</td>
                    </tr>
                  </table>
                </div>
                <canvas class="my-3" ref="totalsChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1">
          <!-- Third column -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { markRaw } from "vue";

export default {
  data() {
    return {
      dateList: [],
      loadingSpinner: false,
      showCard: false,
      showDetailsFood: false,
      selectedFood: null, // used to show details of an already added food entry
      addCategory: "",
      inputValue: "", //TODO: use this to search for a food in the database
      userCalories: 3000, // TODO: change this to global variable, get from vuex store
      activeSlide: 0,
      isUpdated: false,
      dailyGoal: 3000, //TODO: get this from Store
      //TODO: get FoodList from store / bzw. fatsecretApi
      foodList: [
        {
          foodName: "Salmon",
          calories: 233,
          macronutrients: {
            protein: 24,
            carbohydrates: 0,
            fat: 15,
          },
          unit: "100g",
        },
        {
          foodName: "Spinach",
          calories: 23,
          macronutrients: {
            protein: 2.9,
            carbohydrates: 3.6,
            fat: 0.4,
          },
          unit: "100g",
        },
        {
          foodName: "Almonds",
          calories: 576,
          macronutrients: {
            protein: 21,
            carbohydrates: 22,
            fat: 49,
          },
          unit: "100g",
        },
        {
          foodName: "Chicken Breast",
          calories: 165,
          macronutrients: {
            protein: 31,
            carbohydrates: 0,
            fat: 3.6,
          },
          unit: "100g",
        },
        {
          foodName: "Broccoli",
          calories: 34,
          macronutrients: {
            protein: 2.8,
            carbohydrates: 6.6,
            fat: 0.4,
          },
          unit: "100g",
        },
        {
          foodName: "Greek Yogurt",
          calories: 59,
          macronutrients: {
            protein: 10,
            carbohydrates: 3.6,
            fat: 0.4,
          },
          unit: "100g",
        },
        {
          foodName: "Sweet Potato",
          calories: 86,
          macronutrients: {
            protein: 1.6,
            carbohydrates: 20,
            fat: 0.1,
          },
          unit: "100g",
        },
        {
          foodName: "Avocado",
          calories: 160,
          macronutrients: {
            protein: 2,
            carbohydrates: 9,
            fat: 15,
          },
          unit: "100g",
        },
        {
          foodName: "Quinoa",
          calories: 120,
          macronutrients: {
            protein: 4.4,
            carbohydrates: 21,
            fat: 1.9,
          },
          unit: "100g",
        },
        {
          foodName: "Egg",
          calories: 155,
          macronutrients: {
            protein: 13,
            carbohydrates: 1.1,
            fat: 11,
          },
          unit: "100g",
        },
      ],
      selectedItem: -1,
      itemToAdd: null,
      numServings: 1,
      // push and retrive data by accessing the key using the date as a string
      // such as: 'Tue, 2. May 23' - I get this by calling: dateList.at(activeSlide)
      // TODO: store data exactly like this also in Firebase
      foodData: {
        "Tue, 2. May 23": {
          // TODO: store data for food element like this (also for addFood method):
          breakfast: [
            {
              // TODO: give each food entry an ID (that can be generated by firebase)
              foodName: "Pain au Chocolat",
              calories: 350,
              macronutrients: {
                protein: 14,
                carbohydrates: 102,
                fat: 3.6,
              },
              unit: "1 serving",
            },
            {
              foodName: "Protein Shake",
              calories: 165,
              macronutrients: {
                protein: 31,
                carbohydrates: 5,
                fat: 9.6,
              },
              unit: "500 ml",
            },
            {
              foodName: "Cream cheese bagel",
              calories: 500,
              macronutrients: {
                protein: 40,
                carbohydrates: 12,
                fat: 98,
              },
              unit: "1 bagel",
            },
          ],
          lunch: [
            // TODO: give each food entry an ID (that can be generated by firebase)
            {
              foodName: "Burger Fries",
              calories: 800,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "500 ml",
            },
            {
              foodName: "Steak Frites Bernaise",
              calories: 1500,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "1 bagel",
            },
          ],
          dinner: [
            {
              // TODO: give each food entry an ID (that can be generated by firebase)
              foodName: "Abendbrot",
              calories: 350,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "1 serving",
            },
            {
              foodName: "Käse Gouda",
              calories: 500,
              macronutrients: {
                protein: 18,
                carbohydrates: 13,
                fat: 4.6,
              },
              unit: "1 bagel",
            },
          ],
          exercise: [
            {
              exerciseName: "Running",
              caloriesBurned: "400",
              duration: "35 min",
            },
          ],
          snacks: [
            {
              // TODO: give each food entry an ID (that can be generated by firebase)
              foodName: "Pain au Chocolat",
              calories: 350,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "1 serving",
            },
            {
              foodName: "Protein Shake",
              calories: 165,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "500 ml",
            },
            {
              foodName: "Cream cheese bagel",
              calories: 500,
              macronutrients: {
                protein: 31,
                carbohydrates: 0,
                fat: 3.6,
              },
              unit: "1 bagel",
            },
          ],
          // totals: "" // TODO: dont need these just add food and subtract exercise
        },
        "Wed, 3. May 23": {
          breakfast: "croissant 300 cals",
          lunch: "protein shake 700 cals",
          dinner: "burher 1200 cals",
          exercise: "walk: 800 cals",
          snacks: "chocolate 200 cals",
        },
      },
      macrosChart: null,
      chartData: {
        labels: ["Protein", "Carbohydrates", "Fat"],
        datasets: [
          {
            label: "Macros",
            // data: [{ value: 10 }, { value: 30 }, { value: 40 }],
            data: [12, 19, 3],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      chartOptions: {
        cutout: 50,
        plugins: {
          legend: {
            display: false, // hide labels
          },
        },
      },
      totalsChart: null,
      totalsData: {},
      totalsOptions: {},
    };
  },
  beforeUnmount() {
    if (this.macrosChart) {
      this.macrosChart.destroy();
    }
  },
  mounted() {
    this.getDates();
    this.createTotalsChart();
    // this.isMounted = true;
  },
  updated() {
    this.isUpdated = true;
  },
  computed: {
    filteredList() {
      if(this.inputValue != "") {
        return this.foodList.filter(item => item.foodName.toLowerCase().includes(this.inputValue.toLowerCase()))
      }
      return this.foodList;
    },
    selectedItemToAdd() {
      // currently selected item in the list -> for displaying info about that food
      return this.foodList[this.selectedItem];
    },
    breakfastItems() {
      if (this.dateList && this.activeSlide !== null) {
        const foodData = this.getFoodData();
        if (foodData && foodData.breakfast) {
          return foodData.breakfast;
        } else {
          return null;
        }
      }
      return "Loading";
    },
    lunchItems() {
      if (this.dateList && this.activeSlide !== null) {
        const foodData = this.getFoodData();
        if (foodData && foodData.lunch) {
          return foodData.lunch;
        } else {
          return "No lunch data available";
        }
      }
      return "Loading";
    },
    dinnerItems() {
      if (this.dateList && this.activeSlide !== null) {
        const foodData = this.getFoodData();
        if (foodData && foodData.dinner) {
          return foodData.dinner;
        } else {
          return "No dinner data available";
        }
      }
      return "Loading";
    },
    snackItems() {
      if (this.dateList && this.activeSlide !== null) {
        const foodData = this.getFoodData();
        if (foodData && foodData.snacks) {
          return foodData.snacks;
        } else {
          return "No snack data available";
        }
      }
      return "Loading";
    },
    exerciseItems() {
      if (this.dateList && this.activeSlide !== null) {
        const foodData = this.getFoodData();
        if (foodData && foodData.exercise) {
          return foodData.exercise;
        } else {
          return "No exercise data available";
        }
      }
      return "Loading";
    },
  },
  methods: {
    createChart() {
      const chart = new Chart(this.$refs["myChart"], {
        type: "doughnut",
        data: this.chartData,
        options: this.chartOptions,
      });
      this.macrosChart = markRaw(chart);
    },
    updateChart() {
      if (this.macrosChart) {
        const newMacros = [];
        for (const macro in this.selectedItemToAdd.macronutrients) {
          newMacros.push(this.selectedItemToAdd.macronutrients[macro]);
          console.log(this.selectedItemToAdd.macronutrients[macro]);
        }
        this.macrosChart.data.datasets[0].data = newMacros;
        this.macrosChart.update();
      }
    },
    getFoodData() {
      if (this.dateList != null && this.activeSlide !== null) {
        return this.foodData[this.dateList.at(this.activeSlide)];
      }
      return null;
    },
    updateActiveSlide(operation) {
      operation === "+" ? this.activeSlide++ : this.activeSlide--;
    },
    getDates() {
      const startDate = new Date("2023-05-02");
      const endDate = new Date("2023-12-31");

      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString().slice(0, 10);
        const weekday = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][date.getDay()];
        this.dateList.push(
          `${weekday.slice(0, 3)}, ${this.formatDate(dateString)}`
        );
      }
    },
    formatDate(dateString) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear().toString().substr(-2);
      return `${day}. ${month} ${year}`;
    },
    addEntry(category) {
      switch (category) {
        case "bf":
          this.addCategory = "Breakfast";
          break;
        case "lunch":
          this.addCategory = "Lunch";
          break;
        case "dinner":
          this.addCategory = "Dinner";
          break;
        case "snacks":
          this.addCategory = "Snacks";
          break;
        case "exercise":
          this.addCategory = "Exercise";
          break;
        default:
          break;
      }
      this.showCard = true;

      document.body.style.overflow = "hidden"; // prevent scrolling
    },
    async fetchData() {
      try {
        this.loadingSpinner = true;
        await this.$store.dispatch("fetchFoodData");
        this.loadingSpinner = false;
        console.log("Food data fetched");
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    },
    closeCard() {
      // call the actual method, that adds a new item to the list
      this.pushItem(this.itemToAdd);
      this.showCard = false;
      this.itemToAdd = null;
      this.selectedItem = -1;

      document.body.style.overflow = "auto";
    },
    pushItem(newEntry) {
      // console.log("Active Date/Slide: " + this.dateList[this.activeSlide]); // add item to this date

      let newUnit = "100g";
      if (this.numServings !== 1) {
        newUnit =
          Number(
            Math.floor(newUnit.split("g")[0] * this.numServings)
          ).toString() + "g";
      }

      const editedEntry = {
        ...newEntry,
        calories: newEntry.calories * this.numServings,
        macronutrients: {
          carbohydrates: Math.floor(
            newEntry.macronutrients.carbohydrates * this.numServings
          ),
          fat: Math.floor(newEntry.macronutrients.fat * this.numServings),
          protein: Math.floor(
            newEntry.macronutrients.protein * this.numServings
          ),
        },
        unit: newUnit,
      };
      // console.log(editedEntry);
      // console.log(this.foodData[this.dateList[this.activeSlide]][this.addCategory]);
      this.foodData[this.dateList[this.activeSlide]][
        this.addCategory.toLowerCase()
      ].push(editedEntry);
      this.numServings = 1;
      this.macrosChart.destroy(); // reset the macroChart
    },
    macrosMeal(category) {
      let macros = {
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
      let foodEntries = null;

      switch (category) {
        case "bf":
          foodEntries = this.breakfastItems;
          break;
        case "lunch":
          foodEntries = this.lunchItems;
          break;
        case "dinner":
          foodEntries = this.dinnerItems;
          break;
        case "snacks":
          foodEntries = this.snackItems;
          break;
        case "exercise":
          foodEntries = this.exerciseItems;
          break;
        default:
          break;
      }

      if (foodEntries !== null) {
        for (let i = 0; i < foodEntries.length; i++) {
          // console.log(foodEntries[i].macronutrients); // macros for one foodItem
          macros.protein += foodEntries[i].macronutrients.protein;
          macros.carbohydrates += foodEntries[i].macronutrients.carbohydrates;
          macros.fat += foodEntries[i].macronutrients.fat;
        }
      }

      return `Carbs: ${macros.carbohydrates}g · Protein: ${macros.protein}g · Fat: ${macros.fat}g`;
      // return macros;
    },
    selectItem(index, item) {
      this.selectedItem = index;
      this.itemToAdd = item;

      if (this.macrosChart) {
        this.macrosChart.destroy();
      }
      this.createChart();

      if (this.macrosChart) {
        this.updateChart();
      }
      console.log(index + ", " + item);
    },
    macrosFoodItem(item) {
      //TODO: make individual food items spawn a pop up card,
      // which can be clicked away
      // with the info and macros to that food item
      //TODO: use same function as in macrosMeal()
      // or just call this function from inside macrosMeal()
      this.selectedFood = item;
      this.showDetailsFood = true;

      console.log("display macros for food item");
      document.body.style.overflow = "hidden"; // prevent scrolling
    },
    closeMacroCard() {
      this.showDetailsFood = false;
      this.selectedFood = null;
      document.body.style.overflow = "auto"; // prevent scrolling
    },
    calorieTotals(category) {
      // category is 'breakfast', 'lunch' etc.
      let calTotal = 0;
      let foodEntries = null;

      switch (category) {
        case "bf":
          foodEntries = this.breakfastItems;
          break;
        case "lunch":
          foodEntries = this.lunchItems;
          break;
        case "dinner":
          foodEntries = this.dinnerItems;
          break;
        case "snacks":
          foodEntries = this.snackItems;
          break;
        case "exercise":
          foodEntries = this.exerciseItems;
          break;
        default:
          break;
      }
      if (foodEntries !== null) {
        for (let i = 0; i < foodEntries.length; i++) {
          // console.log(foodEntries[i].calories);
          calTotal += foodEntries[i].calories;
        }
      }
      return calTotal;
    },
    createTotalsChart() {
      const chart = new Chart(this.$refs["totalsChart"], {
        type: "pie",
        data: {
          labels: ["Carbohydrates", "Fat", "Protein"],
          datasets: [
            {
              data: [300, 50, 100],
              backgroundColor: [
                "#00B4BD", // carbs
                "#FF2523", // fat
                "#C829D6", // protein
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              displayColors: false,
              displayData: false,
              callbacks: {
                title: function () {
                  return ""; // Remove the default title
                },
                label: (context) => {
                  const label = context.label || "";
                  const total = context.dataset.data.reduce((a, b) => a + b);
                  const percentage =
                    (context.dataset.data[context.dataIndex] / total) * 100;
                  return `${label}: ${Math.round(percentage)}%`;
                },
              },
            },
          },
        },
      });
      this.totalsChart = markRaw(chart);
    },
  },
};
</script>

<style scoped>
/* totals table */
.tableContainer {
  display: flex;
  justify-content: center;
}

table {
  width: 70%; /* Adjust the width as needed */
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
}

th:first-child,
td:first-child {
  text-align: right;
  width: 1%;
  white-space: nowrap;
  background-color: white;
  border: none;
}

th {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.relative {
  position: relative;
}

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-center {
  text-align: center;
}

p {
  font-size: 1rem;
  margin-bottom: 0;
}

.macroChartDiv {
  height: 150px;
}

canvas {
  margin: 0 auto;
}

.caloriesRemaining,
.meal-time,
.food-entry {
  border-radius: 5px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  border: none;
}
.calTotalText {
}
.calSubtext {
  word-spacing: 50px;
}
.calTotalDay {
  text-align: center;
}
.addEntryBtn {
  background: none;
  border: none;
  color: #0166ee;
  cursor: pointer;
  font-size: inherit;
  font-weight: bold;
  padding: 0;
  text-decoration: none;
}
.addEntryBtn:hover {
  opacity: 0.85;
}
p.subtext {
  font-size: 0.8em;
  color: #999;
}

.scrollable-list {
  height: 280px;
  /* height: 100% */
  /* width: 100px; */
  overflow-y: scroll;
}

.scrollable-list .selected {
  background-color: #f8f9fa;
}
.scrollable-list li:hover {
  background-color: #f8f9fa;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 10px;
}

.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 470px;
  height: 470px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* transition: transform 0.3s ease-in-out; */
}

.macroCard {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 250px;
  height: 250px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* transition: transform 0.3s ease-in-out; */
}

.macroCard {
  padding: 10px;
  margin: 0 auto;
  text-align: center;
}

.aligned-p {
  display: flex;
  justify-content: space-between;
}

.left-text {
  text-align: left;
}

.right-text {
  text-align: right;
}

.macroCard p {
  margin: 5px 0;
}

.macroCard button {
  margin-top: 10px;
}

.addFoodCol {
  /* background-color: lightblue; */
  height: 330px;
}

.addFoodBtn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
}

.addFoodBtn:hover {
  background-color: #0062cc;
}

.addFoodBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.diary div {
  background-color: white;
}

.carousel-item {
  text-align: center;
}
</style>
