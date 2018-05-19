import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueCarousel from 'vue-carousel'
import Carousel3d from 'vue-carousel-3d'
import auth from '../auth'

import home from '@/components/home'
import students from '@/components/students'
import teachers from '@/components/teachers'
import sessions from '@/components/sessions'


Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },  {
      path: '/students/',
      name: 'students',
      component: students,
      beforeEnter: (to, from, next) => {
        auth.checkAuth()
        if (!auth.user.authenticated) {
          next('/');
        } else {
          next()
        }
      }
    },{
      path: '/teachers/',
      name: 'teachers',
      component: teachers,
      beforeEnter: (to, from, next) => {
        auth.checkAuth()
        if (!auth.user.authenticated) {
          next('/');
        } else {
          next()
        }
      }
    }, {
      path: '/sessions/',
      name: 'sessions',
      component: sessions,
      beforeEnter: (to, from, next) => {
        auth.checkAuth()
        if (!auth.user.authenticated) {
          next('/');
        } else {
          next()
        }
      }
    },
  ]
})
