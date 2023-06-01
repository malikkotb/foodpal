import { createStore } from "vuex";
// import { getDatabase, ref, get, set } from "firebase/database";

const store = createStore({
  modules: {},
  state() {
    return {
      foodSearchResults: null,
    };
  },
  mutations: {
    setFoodData(state, payload) {
      state.foodSearchResults = payload; // describes current food data for a search result
    },
  },
  actions: {
   
  },

  getters: {},
});

export default store;
