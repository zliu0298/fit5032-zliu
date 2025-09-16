import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import { isAuthenticated } from '@/authenticate'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAdmin: true }   // 👈 只有 admin 才能访问
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  { 
    path: '/access-denied', 
    name: 'AccessDenied', 
    component: () => import('@/views/AccessDenied.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 先检查是否需要 admin
  if (to.meta.requiresAdmin) {
    const role = localStorage.getItem('role')  // 👈 从 localStorage 获取用户角色
    if (role === 'admin') {
      next()
    } else {
      next('/access-denied')
    }
  } else {
    // 其他页面正常放行
    next()
  }
})

export default router
