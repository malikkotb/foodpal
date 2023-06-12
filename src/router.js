import { createRouter, createWebHistory } from 'vue-router';
// import store from './store/index.js';

// import LoginScreen from './pages/LoginScreen.vue';
// import HomePage from './pages/HomePage.vue';
import NotFound from './pages/NotFound.vue';
import NewsFeed from './pages/NewsFeed.vue';
import UserSettings from './pages/UserSettings.vue';
import UserDiary from './pages/UserDiary.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/diary' },
    // { path: '/home', component: HomePage },
    { path: '/news', component: NewsFeed },
    { path: '/settings', component: UserSettings },
    { path: '/diary', component: UserDiary },

    // {
    //   path: '/chat',
    //   component: ChatPage,
    //   beforeEnter: (to, from, next) => {
    //     if (store.getters.isLoggedIn) {
    //       next();
    //     } else {
    //       next('/');
    //     }
    //   }
    // },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;