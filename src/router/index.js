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
                // 判断是否登陆，未登录重定向到登录页，反之则重定向到首页
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
            component: login
        },
        {
            path: '/hexo',
            name: 'hexo',
            component: hexo
        },
        {
            path: '/shuo',
            name: 'shuo',
            component: shuo
        },
        {
            path: '/image',
            name: 'image',
            component: image
        },
        {
            path: '/cover',
            name: 'cover',
            component: cover
        }
    ]
})
