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
            v-for="text in nbaPlayoffsDummytext"
            :key="text"
          >
            <div class="card-body">
              <h5 class="card-title">{{ text.slice(0,10) }}</h5>
              <p class="card-text">
                {{ text }}
              </p>
              <a href="#" class="btn btn-primary">Learn More</a>
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
      nbaPlayoffsDummytext: [
        "The NBA playoffs are heating up with some exciting matchups in the first round. The Brooklyn Nets are looking dominant behind the play of Kevin Durant, James Harden, and Kyrie Irving, while the Philadelphia 76ers are trying to advance past the first round for the first time since 2018.",
        "In the Western Conference, the defending champion Los Angeles Lakers are struggling without their injured star Anthony Davis, while the Phoenix Suns and Utah Jazz are emerging as contenders. The Dallas Mavericks are also putting up a strong fight against the Los Angeles Clippers.",
        "The New York Knicks are back in the playoffs for the first time since 2013 and have impressed with their gritty play and strong defense. The Atlanta Hawks are their first-round opponents and have been led by the dynamic play of Trae Young.",
        "The Milwaukee Bucks are looking to finally break through and make it to the NBA Finals behind their superstar Giannis Antetokounmpo. They are currently facing the Miami Heat in the first round, who swept them out of the playoffs last year.",
        "The Boston Celtics are facing a tough first-round matchup against the Brooklyn Nets, but are hoping the return of Jaylen Brown from injury can give them a boost. Meanwhile, the Washington Wizards are trying to pull off an upset against the top-seeded Philadelphia 76ers.",
        "The NBA playoffs are heating up with some exciting matchups in the first round. The Brooklyn Nets are looking dominant behind the play of Kevin Durant, James Harden, and Kyrie Irving, while the Philadelphia 76ers are trying to advance past the first round for the first time since 2018.",
        "In the Western Conference, the defending champion Los Angeles Lakers are struggling without their injured star Anthony Davis, while the Phoenix Suns and Utah Jazz are emerging as contenders. The Dallas Mavericks are also putting up a strong fight against the Los Angeles Clippers.",
        "The New York Knicks are back in the playoffs for the first time since 2013 and have impressed with their gritty play and strong defense. The Atlanta Hawks are their first-round opponents and have been led by the dynamic play of Trae Young.",
        "The Milwaukee Bucks are looking to finally break through and make it to the NBA Finals behind their superstar Giannis Antetokounmpo. They are currently facing the Miami Heat in the first round, who swept them out of the playoffs last year.",
        "The Boston Celtics are facing a tough first-round matchup against the Brooklyn Nets, but are hoping the return of Jaylen Brown from injury can give them a boost. Meanwhile, the Washington Wizards are trying to pull off an upset against the top-seeded Philadelphia 76ers.",
      ],
    };
  },
};
</script>

<style scoped>

</style>
