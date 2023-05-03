<template>
  <div>
    <h3>User Dairy Page</h3>
    <h4>Like dairy in the Food tracker app</h4>
    
    <br />

    <div
      id="carouselExampleDark"
      class="carousel carousel-dark slide"
      data-bs-ride="false"
    >
      <div ref="carousel" class="carousel-inner">
        <!-- TODO: bind the :class to active if todays' date is that date -->
        <!-- <div class="carousel-item active">
          <h5>Today 2. May 23</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div> -->
        <div v-for="(date, index) in dateList" v-model="index" :key="index" :class="{ 'carousel-item': true, active: index === activeSlide }">
          <h5>{{ date }}</h5>
          <h3>{{ index }}</h3>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <!-- carousel controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
        @click="updateActiveSlide(index - 1)"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
        @click="updateActiveSlide(index + 1)"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      <!-- carousel controls end-->
    </div>

    <!-- Diary -->
    <div class="diary">
      <div class="">
        <hr />
        <p>Calories Remaining for INSERT DATE OF ACTIVEELEMENT</p>
        <h3>Goal - Food + Exercise = Remaining</h3>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Breakfast</h3>
        <div>active element:</div>
        <div>{{ activeElement }}</div>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Lunch</h3>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Dinner</h3>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Exercise</h3>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Snacks</h3>
      </div>
      <div class="mb-4 mt-4">
        <hr />
        <h3>Totals</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateList: [],     
      activeSlide: 0,
    };
  },
  mounted() {
    this.getDates();
    // this.activeElement = this.$refs.carousel.querySelector('.carousel-item.active');
  },
  computed: {
    activeElement() {
      // console.log("chaning active slide");
      console.log(this.activeSlide);
      return this.dateList.at(this.activeSlide);
    }
  },
  watch: {
    activeSlide(newValue, oldValue) {
      console.log(`Message changed from ${oldValue} to ${newValue}`);
    }
  },
  methods: {
    updateActiveSlide(newIndex) {
      console.log("New index: " + newIndex);
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
      // console.log(this.dateList);
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
  },
};
</script>

<style scoped>

.diary h3{
  text-align: center;
}


.carousel-item {
  text-align: center;
}
</style>
