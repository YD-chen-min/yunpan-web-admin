import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login')
  },

  {
    path: '/logger',
    name: 'logger',
    component: () => import('../components/logger'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../components/error'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/users'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/computer',
    name: 'computer',
    component: () => import('../components/computer'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../components/userInfo'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    component: () => import('../views/Home'),
    meta: {
      requireAuth: true
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
//全局守卫
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (sessionStorage.getItem('user') === null) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  }
  next();
});

export default router
