<template>
  <div>
    <div class="carousel" @slide="updateActiveSlide">
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ 'carousel-item': true, active: index === activeSlide }"
        >
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ slide.title }}</h5>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div>
      <h2>{{ slides[activeSlide].title }}</h2>
      <p>{{ slides[activeSlide].description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: "Slide 1",
          description: "This is the first slide",
        },
        {
          title: "Slide 2",
          description: "This is the second slide",
        },
        {
          title: "Slide 3",
          description: "This is the third slide",
        },
      ],
      activeSlide: 0,
    };
  },
  methods: {
    updateActiveSlide(slideIndex) {
      this.activeSlide = slideIndex;
    },
  },
};
</script>

<style scoped>


</style>
