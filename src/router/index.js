import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'index',
            component: index
        }
    ]
})