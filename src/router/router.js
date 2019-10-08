import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '../pages/home'
import recommend from '../pages/recommend'
import rank from '../pages/rank'
import singer from '../pages/singer'
import serch from '../pages/serch'
import musicList from '../pages/musicList'

const routes = [
  {
    path: '/home',
    component: home,
    meta: { index: 0 },//meta对象的index用来定义当前路由的层级,由小到大,由低到高,决定过渡时的方向
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { index: 1 },
        component: recommend,
      },
      {
        path: '/rank',
        name: 'rank',
        meta: { index: 2 },
        component: rank
      },
      {
        path: '/singer',
        name: 'singer',
        meta: { index: 3 },
        component: singer
      },
      {
        path: '/serch',
        name: 'serch',
        meta: { index: 4 },
        component: serch
      }
    ],
  },
  {
    path: '/musicList/:type/:id',
    meta: { index: 5 },
    component: musicList
  },
  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/home' },
]

const router = new VueRouter({ routes })

export default router 