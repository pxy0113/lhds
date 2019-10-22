/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
// import Meta from 'vue-meta'
import vuex from '../store/index'
// Routes
import paths from './paths'

function route(path, view, name) {
    return {
        name: name || view,
        path,
        component: (resovle) => import(
            `@/views/${view}.vue`
        ).then(resovle)
    }
}

Vue.use(Router)

// Create a new router
const router = new Router({
    // mode: 'history',
    // base:'/dist/',
    routes: paths.map(path => route(path.path, path.view, path.name)).concat([{
        path: '*',
        redirect: '/dashboard'
    }]),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
        return {
            x: 0,
            y: 0
        }
    }
})

// Vue.use(Meta)
router.beforeEach((to, from, next) => { //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了


    if(to.path == '/login'){
        console.log('我就是要去登陆啊')
        next();
    }else{ //去的不是登陆页
        if(!sessionStorage.token){ //未登录
            if(from.path=='/login'){
                next();
            }else{
                vuex.state.showBar = false;
                next('/login');           
            }

        }else{
            next();
        }  
    }
    


});


// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
    Vue.use(VueAnalytics, {
        id: process.env.GOOGLE_ANALYTICS,
        router,
        autoTracking: {
            page: process.env.NODE_ENV !== 'development'
        }
    })
}

export default router
