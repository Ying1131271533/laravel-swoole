import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Test from '@/components/Test'
import Dispatch from '@/components/Dispatch'
import Pay from '@/components/Pay'
import RoomNotify from '@/components/RoomNotify'
import RoomAdmin from '@/components/RoomAdmin'
import RoomUser from '@/components/RoomUser'
import Swoole from '@/components/Swoole'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay
  },
  {
    path: '/dispatch',
    name: 'dispatch',
    component: Dispatch
  },
  {
    path: '/room-notify',
    name: 'room-notify',
    component: RoomNotify
  },
  {
    path: '/room-admin',
    name: 'room-admin',
    component: RoomAdmin
  },
  {
    path: '/room-user',
    name: 'room-user',
    component: RoomUser
  },
  {
    path: '/swoole',
    name: 'swoole',
    component: Swoole
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
