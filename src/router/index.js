import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dynaic from '../views/creations/dynaic/Dynaic.vue'
import Video from '../views/creations/video/Video.vue'
import Zhuanlan from '../views/creations/zhuanlan/Zhuanlan.vue'
import WorkManagement from '../views/managements/workManagement/WorkManagement.vue'
import CommentManagement from '../views/managements/commentManagement/CommentManagement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
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
      path: '/creations/zhuanlan',
      name: 'Zhuanlan',
      component: Zhuanlan
    },
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
