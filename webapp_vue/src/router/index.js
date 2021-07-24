import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import EditTree from '../views/editTree/editTreeView.vue'
import TreeTestPage from '../components/treeTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/EditTree',
    name: 'EditTree',
    component: EditTree
  },
  {
    path: '/TreeTestPage',
    name: 'TreeTestPage',
    component: TreeTestPage
  }
]

const router = new VueRouter({
  routes
})

export default router
