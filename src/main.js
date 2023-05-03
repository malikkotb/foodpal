import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)



// import "bootstrap/dist/js/bootstrap.js";

// firebase 
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";


// const firebaseConfig = {
  
// };


// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const auth = getAuth(firebase);
// export default auth;

// end of firebase initialization


const app = createApp(App);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)

// app.component("the-message", TheMessage);

app.mount("#app");


