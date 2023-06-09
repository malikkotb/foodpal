<template>
  <div class="m-5">
    <div class="row m-5">
    <h3 style="margin-bottom: 2rem"><strong>Your Fitness Goals</strong></h3>
      <div class="col-6">
        <h5>Daily Nutrition Goals <span style="float: right;"><button class="btn btn-primary">EDIT</button></span></h5>
        <ul class="list-group mt-3">
          <li class="list-group-item rounded-0"><span class="boldSpan">Calories</span><span class="boldSpan" style="float: right;">2600</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Carbohydrates</span><span class="boldSpan" style="float: right;">296 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Fat</span><span class="boldSpan" style="float: right;">84 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Protein</span><span class="boldSpan" style="float: right;">165 g</span></li>
        </ul>
      </div>

      <div class="col-6">
        <h5>Personal Settings</h5>
        <ul class="list-group mt-3">
          <li class="list-group-item rounded-0"><span class="boldSpan">Current Weight</span><span class="boldSpan" style="float: right;">85.1 kg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Goal Weight</span><span class="boldSpan" style="float: right;">3000</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Height</span><span class="boldSpan" style="float: right;">3000</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Goal Weight</span><span class="boldSpan" style="float: right;">3000</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Sex</span><span class="boldSpan" style="float: right;">3000</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Date of Birth</span><span class="boldSpan" style="float: right;">3000</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Activity Level</span><span class="boldSpan" style="float: right;">3000</span></li>

        </ul>
      </div>
    </div>
    <img src="../assets/customie_goals.png" width="1200" alt="">
  </div>
</template>

<script>
export default {
    data() {
        return {
            editing: false,
        }
    }
};
</script>

<style scoped>

.list-group-item {
    background-color: #F6F6F6;
    padding: 0.8rem;
}

.boldSpan {
    font-weight: 500;
}

.list-group {
    width: 85%;
}
</style>
