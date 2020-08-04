import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Compositionapi from '../views/Composition-api.vue'
// views
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import User from '../views/User.vue'
import Results from '../views/Results.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/*',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/r/:id',
    name: 'Room',
    component: Room
  },
  {
    path: '/u/:id',
    name: 'User',
    component: User
  },
  {
    path: '/compositionapi',
    name: 'Compositionapi',
    component: Compositionapi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
