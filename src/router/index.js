import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dynaic from '../views/creations/dynaic/Dynaic.vue'
import Video from '../views/creations/video/Video.vue'
import Zhuanlan from '../views/creations/zhuanlan/Zhuanlan.vue'
import WorkManagement from '../views/managements/workManagement/WorkManagement.vue'
import CommentManagement from '../views/managements/commentManagement/CommentManagement.vue'
import Detail from '../views/detail/Detail.vue'
import store from '@/store';
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        // meta: {
        //     keepAlive: true
        // },
        children: [

            {
                path: '/managements/commentmanagement',
                name: 'CommentManagement',
                component: CommentManagement,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/managements/workmanagement',
                name: 'WorkManagement',
                component: WorkManagement,
                meta: {
                    keepAlive: true
                }
            },

        ]
    },
    {
        path: '/creations/dynaic',
        name: 'Dynaic',
        component: Dynaic,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/creations/video',
        name: 'Video',
        component: Video,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/creations/zhuan_lan',
        name: 'Zhuanlan',
        component: Zhuanlan,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/') return next()
    const token = store.getters.getToken;
    if (!token) return next('/')
    next()
})
export default router