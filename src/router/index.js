import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import AppGridView from '../views/AppGridView';
import AppSettings from '../views/AppSettings';
import FourOThree from '../views/ErrorScreens/FourOThree';
import FourOFour from '../views/ErrorScreens/FourOFour';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: SignIn,
  },
  {
    path: '/register',
    name: 'Register',
    component: SignUp,
  },
  {
    path: '/app/:id/gridview',
    name: 'GridView',
    component: AppGridView,
  },
  {
    path: '/app/:id/settings',
    name: 'Settings',
    component: AppSettings,
  },
  {
    path: '/forbidden',
    name: 'FourOThree',
    component: FourOThree,
  },
  {
    path: '*',
    name: 'FourOFour',
    component: FourOFour,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
