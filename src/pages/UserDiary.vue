<template>
  <div style="background-color: #f8f9fa">
    <!-- addFoodCard -->
    <div class="card-container">
      <div v-show="showCard" class="card">
        <div class="card-header">
          <h4 class="mb-0" style="text-align: center">{{ addCategory }}</h4>
        </div>
        <div class="card-body px-4 pb-0">
          <div class="row">
            <div class="mb-0 col-md-6 addFoodCol">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  v-model="inputValue"
                />
                <button
                  @click="fetchData()"
                  class="btn btn-primary"
                  type="button"
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>

              <div class="scrollable-list">
                <div
                  class="d-flex justify-content-center align-items-center h-100"
                  v-if="searchStatus"
                >
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <ul v-else>
                  <li
                    v-for="(item, index) in filteredList"
                    :key="index"
                    @click="selectItem(index)"
                    :class="{ selected: index === selectedItem }"
                  >
                    {{ capitalizeLetter(item.foodName) }}
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
                  <strong>{{
                    capitalizeLetter(selectedItemToAdd.foodName)
                  }}</strong>
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
                    <strong
                      >{{
                        selectedItemToAdd.serving_weight
                          ? selectedItemToAdd.serving_weight
                          : 100
                      }}g</strong
                    >
                  </span>
                </p>
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
      <div class="backdrop" v-if="showCard" @click="closeCard"></div>
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
      <!-- <img :src="currentFoodPicture" height="200" width="200" alt="" /> -->
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

    <div class="container px-0" id="foodDiary">
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
                  <div class="calsRemaining">
                    <p>
                      <strong>{{ userCalories }}</strong
                      ><br /><span class="subtext">Goal</span>
                    </p>
                  </div>
                  <div class="calsRemaining"><p>+</p></div>
                  <div class="calsRemaining">
                    <p>
                      <strong>{{ currentCalories }}</strong
                      ><br /><span class="subtext">Food</span>
                    </p>
                  </div>
                  <div class="calsRemaining"><p>-</p></div>
                  <div class="calsRemaining">
                    <p>
                      <strong>0</strong><br /><span class="subtext"
                        >Exercise</span
                      >
                    </p>
                  </div>
                  <div class="calsRemaining"><p>=</p></div>
                  <div class="calsRemaining">
                    <p>
                      <span style="color: green; font-weight: bold">{{
                        userCalories - currentCalories
                      }}</span
                      ><br /><span class="subtext">Remaining</span>
                    </p>
                  </div>
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
                :style="foodEntryStyle"
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
                  <!-- {{ isUpdated ? macrosMeal("lunch") : "Loading Macros" }} -->
                </p>
              </div>
              <div
                v-for="item in lunchItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                :style="foodEntryStyle"
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
                  <!-- {{ isUpdated ? macrosMeal("dinner") : "Loading Macros" }} -->
                </p>
              </div>
              <div
                v-for="item in dinnerItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                :style="foodEntryStyle"
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
                  <!-- {{ isUpdated ? macrosMeal("snacks") : "Loading Macros" }} -->
                </p>
              </div>
              <div
                v-for="item in snackItems"
                :key="item"
                class="food-entry my-1 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
                @click="macrosFoodItem(item)"
                :style="foodEntryStyle"
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
              <!-- <div class="meal-time mt-4 mb-2 mx-3 px-3 py-2">
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
              <div
                class="food-entry mt-0 mb-4 mx-3 px-3 py-2 d-flex align-items-center justify-content-between"
              >
                <button @click="addEntry('exercise')" class="addEntryBtn">
                  Add Exercise
                </button>
              </div> -->

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
                      <td>Daily Goal</td>
                      <td>{{ userCalories }}</td>
                      <td>{{ userCarbs }} g</td>
                      <td>{{ userFat }} g</td>
                      <td>{{ userProtein }} g</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>{{ currentCalories }}</td>
                      <td>{{ currentCarbs }} g</td>
                      <td>{{ currentFat }} g</td>
                      <td>{{ currentProtein }} g</td>
                    </tr>
                    <tr>
                      <td>Left</td>
                      <td>{{ userCalories - currentCalories }}</td>
                      <td>{{ userCarbs - currentCarbs }} g</td>
                      <td>{{ userFat - currentFat }} g</td>
                      <td>{{ userProtein - currentProtein }} g</td>
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
import { getDatabase, ref, push, get, child } from "firebase/database";

export default {
  data() {
    return {
      foodSearchResults: [],
      dateList: [],
      searchStatus: false,
      showCard: false,
      showDetailsFood: false,
      // currentFoodPicture: null,
      selectedFood: null, // used to show details of an already added food entry
      addCategory: "",
      inputValue: "",
      userCalories: 3000, // these are the set calories and macros set by the user in user settings page
      userCarbs: 300,
      userFat: 90,
      userProtein: 180,
      activeSlide: 0,
      isUpdated: false,
      dailyGoal: 3000, //TODO: get this from Store
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
      // TODO: load data for each individual date from firebase
      foodData: [
        // will be indexed, like the carousel dateList
        {
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
          },
        },
        {
          "Wed, 3. May 23": {
            breakfast: [
              {
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
          },
        },
      ],
      firebaseData: null,
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
  async mounted() {
    this.getDates();
    this.createTotalsChart();

    // Get User Calories and Macros
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users/userId/settings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log(data);
          this.userCalories = data.calories;
          this.userCarbs = data.carbohydrates;
          this.userFat = data.fat;
          this.userProtein = data.protein;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    this.firebaseData = await this.getFoodFromFirebase();
  

    // initialize each date with empty lists
    for (let i = 2; i < this.dateList.length; i++) {
      this.foodData.push({
        [this.dateList[i]]: {
          breakfast: [],
          lunch: [],
          dinner: [],
          exercise: [],
          snacks: [],
        },
      });
    }
  },
  async updated() {
    this.isUpdated = true;
  },
  computed: {
    currentCalories() {
      let calTotal = 0;

      if (this.isUpdated) {
        const foodEntries = [
          this.breakfastItems,
          this.lunchItems,
          this.dinnerItems,
          this.snackItems,
        ];

        for (let i = 0; i < foodEntries.length; i++) {
          if (foodEntries[i] !== null) {
            for (let j = 0; j < foodEntries[i].length; j++) {
              calTotal += foodEntries[i][j].calories;
            }
          }
        }
        return calTotal;
      }

      return calTotal;
    },
    currentCarbs() {
      let carbTotal = 0;

      if (this.isUpdated) {
        const foodEntries = [
          this.breakfastItems,
          this.lunchItems,
          this.dinnerItems,
          this.snackItems,
        ];

        for (let i = 0; i < foodEntries.length; i++) {
          if (foodEntries[i] !== null) {
            for (let j = 0; j < foodEntries[i].length; j++) {
              carbTotal += foodEntries[i][j].macronutrients.carbohydrates;
            }
          }
        }
        return Math.floor(carbTotal);
      }

      return carbTotal;
    },
    currentProtein() {
      let proteinTotal = 0;

      if (this.isUpdated) {
        const foodEntries = [
          this.breakfastItems,
          this.lunchItems,
          this.dinnerItems,
          this.snackItems,
        ];

        for (let i = 0; i < foodEntries.length; i++) {
          if (foodEntries[i] !== null) {
            for (let j = 0; j < foodEntries[i].length; j++) {
              proteinTotal += foodEntries[i][j].macronutrients.protein;
            }
          }
        }
        return Math.floor(proteinTotal);
      }

      return proteinTotal;
    },
    currentFat() {
      let fatTotal = 0;

      if (this.isUpdated) {
        const foodEntries = [
          this.breakfastItems,
          this.lunchItems,
          this.dinnerItems,
          this.snackItems,
        ];

        for (let i = 0; i < foodEntries.length; i++) {
          if (foodEntries[i] !== null) {
            for (let j = 0; j < foodEntries[i].length; j++) {
              fatTotal += foodEntries[i][j].macronutrients.fat;
            }
          }
        }
        return Math.floor(fatTotal);
      }

      return fatTotal;
    },
    foodEntryStyle() {
      if (this.showCard || this.showDetailsFood) {
        return {
          pointerEvents: "none",
        };
      }
      return {
        cursor: "pointer",
        pointerEvents: "auto",
      };
    },
    filteredList() {
      if (this.inputValue != "" && this.foodSearchResults != null) {
        return this.foodSearchResults;
        // return this.foodList.filter((item) =>
        //   item.foodName.toLowerCase().includes(this.inputValue.toLowerCase())
        // );
      }
      return this.foodList;
    },
    selectedItemToAdd() {
      // currently selected item in the list -> for displaying info about that food
      if (this.foodSearchResults.length > 0) {
        return this.foodSearchResults[this.selectedItem];
      } else {
        return this.foodList[this.selectedItem];
      }
    },
    breakfastItems() {
      if (this.isUpdated && this.firebaseData) {
        if (this.dateList && this.activeSlide !== null) {
          
          let breakfastData = [];
          for (let key in this.firebaseData.breakfast) {
            console.log(this.firebaseData.breakfast[key]);
            breakfastData.push(this.firebaseData.breakfast[key]);
          }

          return breakfastData;


          // old code, without firebase
          // const foodData = this.getFoodData(); 
          // if (
          //   foodData &&
          //   foodData[`${this.dateList[this.activeSlide]}`].breakfast
          // ) {
          //   console.log("is Array: " + Array.isArray(foodData[`${this.dateList[this.activeSlide]}`].breakfast));
          //   return foodData[`${this.dateList[this.activeSlide]}`].breakfast;
          // } else {
          //   return null;
          // }
        }
        return "Loading";
      }
      return "Loading";
    },
    lunchItems() {
      if (this.isUpdated) {
        if (this.dateList && this.activeSlide !== null) {
          const foodData = this.getFoodData();
          if (
            foodData &&
            foodData[`${this.dateList[this.activeSlide]}`].lunch
          ) {
            return foodData[`${this.dateList[this.activeSlide]}`].lunch;
          } else {
            return null;
          }
        }
        return "Loading";
      }
      return "Loading";
    },
    dinnerItems() {
      if (this.isUpdated) {
        if (this.dateList && this.activeSlide !== null) {
          const foodData = this.getFoodData();
          if (
            foodData &&
            foodData[`${this.dateList[this.activeSlide]}`].dinner
          ) {
            return foodData[`${this.dateList[this.activeSlide]}`].dinner;
          } else {
            return null;
          }
        }
        return "Loading";
      }
      return "Loading";
    },
    snackItems() {
      if (this.isUpdated) {
        if (this.dateList && this.activeSlide !== null) {
          const foodData = this.getFoodData();
          if (
            foodData &&
            foodData[`${this.dateList[this.activeSlide]}`].snacks
          ) {
            return foodData[`${this.dateList[this.activeSlide]}`].snacks;
          } else {
            return null;
          }
        }
        return "Loading";
      }
      return "Loading";
    },
    exerciseItems() {
      if (this.isUpdated) {
        if (this.dateList && this.activeSlide !== null) {
          const foodData = this.getFoodData();
          if (
            foodData &&
            foodData[`${this.dateList[this.activeSlide]}`].exercise
          ) {
            return foodData[`${this.dateList[this.activeSlide]}`].exercise;
          } else {
            return null;
          }
        }
        return "Loading";
      }
      return "Loading";
    },
  },
  methods: {
    async saveEntry(foodEntry) {
      console.log(foodEntry);
      let dateFormatted = this.dateList[this.activeSlide];
      dateFormatted = dateFormatted
        .split(",")[1]
        .trim()
        .replace(".", "")
        .replace(/\s+/g, "-");
      console.log("date: " + dateFormatted);
      const date = new Date();
      const currentDateTime = date.toLocaleString();
      const db = getDatabase();
      await push(
        ref(
          db,
          "users/" +
            "userId/" +
            `${dateFormatted}/` +
            `${this.addCategory.toLowerCase()}`
        ),
        {
          // users/userId/<Date>/<Category>
          ...foodEntry,
          timeAdded: currentDateTime,
        }
      );
    },
    capitalizeLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
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
        if (this.foodData[this.activeSlide] === null) {
          return null;
        }
        return this.foodData[this.activeSlide];
      }
      return null;
    },
    async getFoodFromFirebase() {
      let dateFormatted = this.dateList[this.activeSlide];
      dateFormatted = dateFormatted
        .split(",")[1]
        .trim()
        .replace(".", "")
        .replace(/\s+/g, "-");
      console.log("reading data for: " + dateFormatted);

      try {
        const dbRef = ref(getDatabase());
        await get(child(dbRef, "users/userId/" + `${dateFormatted}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              console.log("data inside try block: " + Object.keys(data));
              this.firebaseData = data;
              return data;
            } else {
              console.log("No data available");
              return null;
            }
          })
          .catch((error) => {
            console.error(error);
          });


      } catch (error) {
        console.error("Error reading data from Firebase:", error);
        return null;
      }

      // const dbRef = ref(getDatabase());
      // await get(
      //   child(dbRef, "users/userId/" + `${dateFormatted}`)
      // )
      //   .then((snapshot) => {
      //     if (snapshot.exists()) {
      //       const data = snapshot.val();
      //       return data;
      //     } else {
      //       console.log("No data available");
      //       return null;
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    updateActiveSlide(operation) {
      operation === "+" ? this.activeSlide++ : this.activeSlide--;
      //TODO: call getFoodFromFirebase for new Date (using formattedDate) here
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
        if (this.inputValue !== "") {
          this.searchStatus = true;
          await this.fetchFoodData(this.inputValue); // input is query
          this.searchStatus = false;
          console.log("Food data fetched, global search results: ");
          console.log(this.foodSearchResults);
          // this.inputValue = "";
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    },
    closeCard() {
      // call the actual method, that adds a new item to the list
      if (this.itemToAdd) {
        this.pushItem(this.itemToAdd);
        this.itemToAdd = null;
      }
      this.showCard = false;
      this.foodSearchResults = [];
      this.inputValue = "";
      this.selectedItem = -1;

      document.body.style.overflow = "auto";
      // document.getElementById('foodDiary').style.pointerEvents = 'auto';
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

      const foodData = this.getFoodData();

      // console.log(foodData[`${this.dateList[this.activeSlide]}`]);

      foodData[`${this.dateList[this.activeSlide]}`][
        this.addCategory.toLowerCase()
      ].push(editedEntry);
      this.numServings = 1;
      this.macrosChart.destroy(); // reset the macroChart

      // WRITE to FIREBASE BACKEND
      this.saveEntry(editedEntry);
    },
    macrosMeal(category) {
      let macros = {
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
      let foodEntries = null;

      console.log("FIREBASE DATA: " + foodFromFirebase);

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

      console.log("foodEntries : " + foodEntries);

      if (foodEntries !== null) {
        for (let i = 0; i < foodEntries.length; i++) {
          // console.log(foodEntries[i].macronutrients); // macros for one foodItem
          macros.protein += foodEntries[i].macronutrients.protein;
          macros.carbohydrates += foodEntries[i].macronutrients.carbohydrates;
          macros.fat += foodEntries[i].macronutrients.fat;
        }
      }

      return `Carbs ${macros.carbohydrates}g · Protein ${macros.protein}g · Fat ${macros.fat}g`;
      // return macros;
    },
    selectItem(index) {
      this.selectedItem = index;
      if (this.foodSearchResults.length === 0) {
        this.itemToAdd = this.foodList[index];
      } else {
        this.itemToAdd = this.foodSearchResults[index];
      }

      if (this.macrosChart) {
        this.macrosChart.destroy();
      }
      this.createChart();

      if (this.macrosChart) {
        this.updateChart();
      }
    },
    macrosFoodItem(item) {
      this.selectedFood = item;
      this.showDetailsFood = true;
      // this.getFoodPicture(item.foodName);
      document.body.style.overflow = "hidden"; // prevent scrolling
    },
    closeMacroCard() {
      this.showDetailsFood = false;
      this.selectedFood = null;
      // this.currentFoodPicture = null;
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
              // change data to: this.currentCarbs, this.currentFat, this.currentProtein
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
    async fetchFoodData(query) {
      const instantUrl = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`;

      let foodSearchResults = []; // array of objects for each food object
      // including: name, qunatity, macros and thumbnail picture

      const appId = "d04417ed";
      const appKey = "97c68d598f0b2c81ba6104574b4e93ed";
      // Make the request to the instant search endpoint
      await fetch(instantUrl, {
        headers: {
          "x-app-id": appId,
          "x-app-key": appKey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Search Results:", data.common); // only getting common foods right now, not branded ones

          // TODO: change to i < 10 -> to only get top 10 results
          for (let i = 0; i < 3; i++) {
            const foodItem = {
              foodName: data.common[i].food_name,
              photo: data.common[i].photo.thumb,
            };
            foodSearchResults.push(foodItem);
          }

          // TODO: change to i < 10 -> to only get top 10 results
          // Iterate over the search results and fetch macronutrient details for each result
          for (let i = 0; i < 3; i++) {
            // Make the request to the nutrient details endpoint for each result
            const nutrientUrl = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
            const macrosQuery = `${foodSearchResults[i].foodName}`;
            fetch(nutrientUrl, {
              method: "POST",
              headers: {
                "x-app-id": appId,
                "x-app-key": appKey,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query: macrosQuery }), // nix_item_id: nixItemId
            })
              .then((response) => response.json())
              .then((data) => {
                // Get macros, calories and other details

                const foodItemFinal = {
                  ...foodSearchResults[i],
                  calories: data.foods["0"].nf_calories,
                  macronutrients: {
                    fat: data.foods["0"].nf_total_fat,
                    carbohydrates: data.foods["0"].nf_total_carbohydrate,
                    protein: data.foods["0"].nf_protein,
                  },
                  serving_weight: data.foods["0"].serving_weight_grams,
                  serving_qty: data.foods["0"].serving_qty,
                };

                foodSearchResults[i] = foodItemFinal;
              })
              .catch((error) => {
                // Handle any errors
                console.error("Error fetching macronutrient data:", error);
              });
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching search results:", error);
        });
      this.foodSearchResults = foodSearchResults;
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

.container {
  /* position: relative; */
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
.calTotalDay {
  text-align: center;
}

.calsRemaining {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
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
p.subtext,
span.subtext {
  font-size: 0.92em;
  color: #797878;
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
  z-index: 3;
  width: 470px;
  height: 470px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* transition: transform 0.3s ease-in-out; */
}

.card-container {
  position: relative;
  /* Add other styles as needed */
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Adjust the opacity value to control darkness */
  z-index: 2;
  /* Add other styles for the backdrop */
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
