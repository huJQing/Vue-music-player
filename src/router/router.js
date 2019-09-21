import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '../pages/home'
import recommend from '../pages/recommend'
import rank from '../pages/rank'
import singer from '../pages/singer'
import serch from '../pages/serch'
import playList from '../pages/playList'

const routes = [
  {
    path: '/home', component: home,
    children: [
      {
        path: '/home', component: recommend,
        meta: { index: 1 }
      },
      {
        path: '/rank', component: rank,
        meta: { index: 2 }
      },
      {
        path: '/singer', component: singer,
        meta: { index: 3 }
      },
      {
        path: '/serch', component: serch,
        meta: { index: 4 }
      }
    ],
  },
  { path: '/playList/:type/:id', component: playList },
  { path: '', redirect: '/home' },
  { path: '/', redirect: '/home' }
]

const router = new VueRouter({ routes })

export default router 