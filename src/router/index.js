import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/features/landing/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    }
    
    ,{
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/features/auth/views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/features/dashboard/views/DashboardView.vue')
    },
    {
      path: '/pending-approval',
      name: 'pending',
      component: () => import('@/features/auth/views/PendingApprovalView.vue')
    },
    {
      path: '/banned',
      name: 'banned',
      component: () => import('@/features/auth/views/BannedView.vue')
    },
    {
      path: '/server-error',
      name: 'server-error',
      component: () => import('@/components/shared/ServerErrorView.vue')
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('@/features/files/views/FilesExplorerView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

export default router