<template>
  <div class="m-5">
    <div class="row m-5">
    <h3 style="margin-bottom: 2rem"><strong>Your Fitness Goals</strong></h3>
      <div class="col-6">
       
        <div style="width: 85%;" class="d-flex justify-content-between">
            <h5>Daily Nutrition Goals</h5>
        </div>
        <ul class="list-group mt-3">
          <li class="list-group-item rounded-0"><span class="boldSpan">Calories</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="calories" :placeholder="calories" type="text" class="inputSettings">{{editing ? "" : calories }}</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Carbohydrates</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="carbohydrates" :placeholder="carbohydrates" type="text" class="inputSettings">{{ editing ? "" : carbohydrates}} g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Fat</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="fat" :placeholder="fat" type="text" class="inputSettings">{{ editing ? "" : fat}} g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Protein</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="protein" :placeholder="protein" type="text" class="inputSettings">{{ editing ? "" : protein}} g</span></li>
        </ul>

        <br>
        <br>

        <div style="width: 85%;" class="d-flex justify-content-between">
            <h5>Micronutrients</h5>
        </div>
        <ul class="list-group mt-3">
          <li class="list-group-item rounded-0"><span class="boldSpan">Saturated Fat</span><span class="boldSpan" style="float: right;">29 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Unsaturated Fat</span><span class="boldSpan" style="float: right;">0 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Cholesterol</span><span class="boldSpan" style="float: right;">300 mg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Sodium</span><span class="boldSpan" style="float: right;">2300 mg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Potassium</span><span class="boldSpan" style="float: right;">3500 mg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Fiber</span><span class="boldSpan" style="float: right;">38 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Sugar</span><span class="boldSpan" style="float: right;">97 g</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Vitamin A</span><span class="boldSpan" style="float: right;">100 %DV</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Vitamin C</span><span class="boldSpan" style="float: right;">100 %DV</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Calcium</span><span class="boldSpan" style="float: right;">100 %DV</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Iron</span><span class="boldSpan" style="float: right;">100 %DV</span></li>
        </ul>
      </div>
      <div class="col-6">
        <div style="width: 85%;" class="d-flex justify-content-between">
            <h5>Personal Settings</h5>
        </div>
        <ul class="list-group mt-3">
          <li class="list-group-item rounded-0"><span class="boldSpan">Current Weight</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="current_weight" :placeholder="current_weight" type="text" class="inputSettings">{{ editing ? "" : current_weight}} kg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Goal Weight</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="goal_weight" :placeholder="goal_weight" type="text" class="inputSettings">{{ editing ? "" : goal_weight}} kg</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Height</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="height" :placeholder="height" type="text" class="inputSettings">{{ editing ? "" : height}} cm</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Sex</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="sex" :placeholder="sex" type="text" class="inputSettings">{{ editing ? "" : sex}}</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Date of Birth</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="dateBirth" :placeholder="dateBirth" type="text" class="inputSettings">{{ editing ? "" : dateBirth}}</span></li>
          <li class="list-group-item rounded-0"><span class="boldSpan">Activity Level</span><span class="boldSpan" style="float: right;"><input v-if="editing" v-model="activityLevel" :placeholder="activityLevel" type="text" class="inputSettings">{{ editing ? "" : activityLevel}}</span></li>
        </ul>
      </div>

      <div class="d-flex justify-content-center my-5">
        <button class="btn btn-primary btn-lg  mx-3 px-4" @click="editGoals">EDIT GOALS</button>
        <button :disabled="!editing" class="btn btn-secondary btn-lg mx-3 px-4" @click="saveChanges">SAVE CHANGES</button>
      </div>


    </div>
  </div>
</template>

<script>
import { getDatabase, ref, set, child, get } from "firebase/database";

export default {
    data() {
        return {
            editing: false,
            calories: 2600,
            carbohydrates: 296,
            fat: 84,
            protein: 165,
            current_weight: 85.1,
            goal_weight: 90,
            height: 191,
            sex: 'Male',
            dateBirth: '07/07/2001',
            activityLevel: "Active"
        }
    },
    mounted() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/userId/settings"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            this.calories = data.calories;
            this.carbohydrates = data.carbohydrates;
            this.fat = data.fat;
            this.protein = data.protein;
            this.current_weight = data.current_weight;
            this.goal_weight = data.goal_weight;
            this.height = data.height;
            this.sex = data.sex;
            this.dateBirth = data.dateBirth;
            this.activityLevel = data.activityLevel;

          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    methods: {
        editGoals() {
            console.log("edit goals");
            this.editing = true;
        },
        async saveChanges() {
            this.editing = false;
            const db = getDatabase();
            await set(ref(db, "users/" + "userId/settings"), {
                calories: this.calories,
                carbohydrates: this.carbohydrates,
                fat: this.fat,
                protein: this.protein,
                current_weight: this.current_weight,
                goal_weight: this.goal_weight,
                height: this.height,
                sex: this.sex,
                dateBirth: this.dateBirth,
                activityLevel: this.activityLevel,
            });
            console.log("changes saved");
        }
    },
    computed: {
        
    }
};
</script>

<style scoped>
.inputSettings {
    width: 80px;
}
.list-group-item {
    background-color: #F6F6F6;
    padding: 1rem;
}

.boldSpan {
    font-weight: 500;
}

.list-group {
    width: 85%;
}
</style>
