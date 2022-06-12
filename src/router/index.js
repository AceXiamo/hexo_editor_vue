import Vue from 'vue'
import Router from 'vue-router'
import hexo from '@/view/hexo/index'
import login from '@/view/login/index'
import shuo from '@/view/shuo/index'
import image from '@/view/image/index'
import cover from '@/view/cover/index'
import cookie from 'vue-cookies'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: to => {
      let token = cookie.get("token");
      if (token) {
        return "/hexo"
      } else {
        return "/login"
      }
    }
  },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/hexo',
      name: 'hexo',
      component: hexo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/shuo',
      name: 'shuo',
      component: shuo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/image',
      name: 'image',
      component: image,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/cover',
      name: 'cover',
      component: cover,
      meta: {
        requireAuth: true
      }
    }
  ]
})
