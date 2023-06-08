<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <!-- First column -->
        </div>
        <div class="col-8">
          <div
            class="card shadow-sm m-4"
            v-for="entry in merged"
            :key="entry.text"
          >
            <div class="card-body">
              <h5 class="card-title">{{ entry.text.split(":")[0] }}</h5>
              <p class="card-text">
                {{ entry.text.split(":")[1] }}
              </p>
              <a v-if="entry.link" @click="openLink(entry.link)" class="btn btn-primary">Learn More</a>
            </div>
          </div>
          <!-- Middle column -->
        </div>
        <div class="col-2">
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
      blogPosts: [
        "The Importance of Regular Exercise: Discover the numerous benefits of regular exercise, from improving cardiovascular health and boosting mood to increasing energy levels and managing weight effectively. Incorporate a mix of aerobic, strength training, and flexibility exercises into your routine for optimal results.",
        "Nutrition Tips for a Healthy Lifestyle: Learn about the key components of a balanced diet and how to make healthier food choices. Explore the benefits of incorporating fruits, vegetables, whole grains, lean proteins, and healthy fats into your meals. Remember to stay hydrated and limit processed foods and added sugars for optimal health.",
        "Mental Well-being and Physical Health: Understand the strong connection between mental and physical well-being. Explore strategies to reduce stress, practice mindfulness, and prioritize self-care. Engaging in activities like meditation, yoga, or spending time in nature can have a positive impact on both your mind and body.",
        "The Power of Sleep: Discover the importance of quality sleep for overall health and fitness. Learn about the recommended sleep duration for different age groups and strategies to improve sleep hygiene. Prioritize creating a relaxing sleep environment and establish a consistent bedtime routine.",
        "Effective Time Management for Fitness: Find practical ways to incorporate exercise into your busy schedule. Explore time-saving workouts, such as high-intensity interval training (HIIT) or short home workouts. Prioritize your fitness goals and schedule dedicated time for physical activity.",
        "Building Strong and Lean Muscles: Explore different strength training exercises and techniques to build and tone your muscles. Learn about the benefits of resistance training, proper form, and progression strategies. Don't forget to include recovery days and fuel your body with adequate protein for muscle repair and growth.",
        "Mindful Eating for Weight Management: Discover the concept of mindful eating and its role in weight management. Learn to listen to your body's hunger and fullness cues, eat slowly, and savor each bite. Practice mindful portion control and make conscious food choices that nourish your body.",
        "Cardiovascular Health: Discover different cardiovascular exercises to improve heart health and endurance. Explore activities like running, cycling, swimming, or dancing. Find ways to make cardio workouts enjoyable and incorporate them into your routine regularly.",
        "Stress Management Techniques: Explore effective strategies to manage stress for improved overall health. Find activities that help you relax and unwind, such as deep breathing exercises, meditation, or engaging in hobbies. Prioritize self-care and find healthy outlets to cope with stress.",
        "Fitness for Busy Professionals: Learn how to prioritize fitness despite a demanding work schedule. Discover strategies to incorporate physical activity into your workday, such as desk exercises, active commuting, or lunchtime walks. Find a balance that allows you to take care of your health and excel in your professional life.",
      ],
      relatedLinks: [
        "https://www.heart.org/en/healthy-living/fitness/fitness-basics/why-is-physical-activity-so-important-for-health-and-wellbeing",
        "https://www.eatright.org/food/nutrition/healthy-eating/eating-right-for-a-healthy-weight",
        "https://www.apa.org/topics/mental-health/index",
        "https://www.sleepfoundation.org/bedroom-environment/tips-make-your-bedroom-better-sleep",
        "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/exercise/faq-20057916",
        "https://www.verywellfit.com/the-benefits-of-strength-training-1230727",
        "https://www.health.harvard.edu/staying-healthy/mindful-eating",
        "https://www.heart.org/en/healthy-living/fitness/fitness-basics/aerobic-exercise",
        "https://www.helpguide.org/articles/stress/stress-management.htm",
        "https://www.forbes.com/sites/forbescoachescouncil/2019/01/15/how-to-stay-fit-and-healthy-when-youre-a-busy-professional/?sh=5ed5ac4968af",
      ],
    };
  },
  computed: {
    merged() {
      const mergedArray = this.blogPosts.map((text, index) => ({
        text,
        link: this.relatedLinks[index],
      }));
      return mergedArray;
    },
  },
  methods: {
    openLink(url) {
      // Open the related link in a new tab or perform any desired action
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped></style>
