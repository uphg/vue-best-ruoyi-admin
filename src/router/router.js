import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/components/layout/layout-default'
import Home from '@/pages/home/home-page'

/**
 * @typedef {object} RouteMetaInfo
 * @property {string} title - 路由标题
 * @property {string} [icon] - 图标名称
 * @property {boolean} [affix] - 是否固定在标签页
 */

/**
 * @typedef {object} RouteConfig
 * @property {string} path - 路由路径
 * @property {import('vue').Component|Function} [component] - 路由组件
 * @property {string} [name] - 路由名称
 * @property {string} [redirect] - 重定向路径
 * @property {boolean} [hidden] - 是否在菜单中隐藏
 * @property {boolean} [alwaysShow] - 是否合并单个子路由
 * @property {RouteConfig[]} [children] - 子路由配置
 * @property {RouteMetaInfo} [meta] - 路由元信息
 */

/**
 * 常量路由配置
 * @type {RouteConfig[]}
 */
export const constantRoutes = [
  {
    path: '',
    component: LayoutDefault,
    redirect: '/home',
    // alwaysShow: true,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'shell', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/pages/login/login-page'),
  },
  {
    path: '/register',
    name: 'Register',
    hidden: true,
    component: () => import('@/pages/register/register-page'),
  },
  {
    path: '/user',
    redirect: 'noredirect',
    hidden: true,
    component: LayoutDefault,
    children: [
      {
        path: 'profile',
        component: () => import('@/pages/user/user-page'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import('@/pages/error/404'),
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/pages/error/401'),
  },
]

/**
 * Vue Router 实例
 * @type {import('vue-router').Router}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
