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
        children: [

            {
                path: '/managements/commentmanagement',
                name: 'CommentManagement',
                component: CommentManagement
            },
            {
                path: '/managements/workmanagement',
                name: 'WorkManagement',
                component: WorkManagement
            },
        ]
    },
    {
        path: '/creations/dynaic',
        name: 'Dynaic',
        component: Dynaic
    },
    {
        path: '/creations/video',
        name: 'Video',
        component: Video
    },
    {
        path: '/creations/zhuan_lan',
        name: 'Zhuanlan',
        component: Zhuanlan
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
    if(!token) return next('/')
    next()
})
export default router