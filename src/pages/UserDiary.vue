<template>
  <div style="background-color: #F8F9FA">
    <!-- carousel -->
    <div
      id="carouselExampleDark"
      class="carousel carousel-dark slide p-4"
      data-bs-ride="false"
      style="background-color: #F8F9FA"
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

    <!-- TODO: less margin between food items and Meal-Category 
  but a little margin between each food category
so between Breakfast section and lunch section a little more margin -->

    <div class="container px-0">
      <div class="row">
        <div class="col-1">
          <!-- First column -->
        </div>
        <div class="col-10 px-0">
          <!-- Middle column -->
          <div style="background-color: #F8F9FA">
            <div class="diary">
              <div class="caloriesRemaining mt-0 mb-2 mx-3 px-3 py-4">
                <div
                  class="mb-0 d-flex justify-content-between align-items-baseline"
                >
                  <p><strong>Calories Remaining</strong></p>
                  <p class="text-end">
                    ---
                    {{ dateList.at(activeSlide) }}
                  </p>
                </div>
                <p class="">Goal - Food + Exercise = Remaining</p>
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
              <div class="mt-4 mx-3">
                <p><strong>Totals</strong></p>
                <p>Change or fix margins / paddings here</p>
                <!-- <p>{{ foodItem && foodItem.snacks ? foodItem.snacks : 'No snack data available' }}</p> -->
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
export default {
  data() {
    return {
      dateList: [],
      userCalories: 3000, // TODO: change this to global variable, get from vuex store
      activeSlide: 0,
      isUpdated: false,
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
    };
  },
  mounted() {
    this.getDates();
    // this.isMounted = true;
  },
  updated() {
    this.isUpdated = true;
  },
  computed: {
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
      //category again -> brakfast, lunch, exercise etc is a parameter
      console.log(category);
      // add food or exercise to that category

      //TODO: add food item, also pop up when you click on the button
      alert("Add Item to: " + category);
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
          console.log(foodEntries[i].macronutrients); // macros for one foodItem
          macros.protein += foodEntries[i].macronutrients.protein;
          macros.carbohydrates += foodEntries[i].macronutrients.carbohydrates;
          macros.fat += foodEntries[i].macronutrients.fat;
        }
      }

      return `Carbs: ${macros.carbohydrates}g · Protein: ${macros.protein}g · Fat: ${macros.fat}g`;
      // return macros;
    },
    macorsSingleFoodItem() {
      //TODO: make a pop up card, which can be clicked away
      // with the info to that food item
      //TODO: use same function as in macrosMeal()
      // or just call this function from inside macrosMeal()
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
  },
};
</script>

<style scoped>
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

p {
  margin-bottom: 0;
}
.diary div {
  background-color: white;
}

.carousel-item {
  text-align: center;
}
</style>
