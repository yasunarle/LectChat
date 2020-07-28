import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Compositionapi from '../views/Composition-api.vue'
// views
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compositionapi',
    name: 'Compositionapi',
    component: Compositionapi
  },
  {
    path: '/room/:id',
    name: 'room',
    component: Room
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
