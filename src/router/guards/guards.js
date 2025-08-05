import { apiGetRouteData, apiGetUserInfo } from '@/api/user'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/token'
import { constantRoutes } from '../router'
import { createAsyncRoutes, createSidebarMenus } from './async-route'

/**
 * 通用路由名称列表（无需权限验证的路由）
 * @type {(string|symbol)[]}
 */
const commonRoutes = ['Login', '404']

/**
 * 加载路由守卫
 * @param {import('vue-router').Router} router - Vue Router 实例
 */
export function loadRouterGuard(router) {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  router.beforeEach(async (to, from) => {
    if (userStore.id) {
      return toPermissionRoute(to, from)
    }
    const token = getToken()
    if (!token) {
      return toCommonRoute(to, from)
    }
    await loadPermissionInfo(router, { userStore, sidebarStore })
    return { ...to, replace: true }
  })
}

/**
 * 加载权限信息和动态路由
 * @param {import('vue-router').Router} router - Vue Router 实例
 * @param {object} stores - Store 实例
 * @param {object} stores.userStore - 用户 Store
 * @param {object} stores.sidebarStore - 侧边栏 Store
 */
async function loadPermissionInfo(router, { userStore, sidebarStore }) {
  const routeDataRes = await apiGetRouteData()
  const userInfoRes = await apiGetUserInfo()
  const routes = createAsyncRoutes(routeDataRes.data)
  const menuData = (constantRoutes).concat(routes)

  const { menus, menusMap } = createSidebarMenus(menuData)
  // const menusMap = createSidebarMenuMap(menuData)

  sidebarStore.setMenuMap(menusMap)
  sidebarStore.setMenus(menus)
  userStore.set(userInfoRes.data)

  routes.forEach((route) => {
    router.addRoute(route)
  })
}

/**
 * 处理通用路由跳转（未登录状态）
 * @param {import('vue-router').RouteLocationNormalizedLoaded} to - 目标路由
 * @param {import('vue-router').RouteLocationNormalized} _from - 来源路由
 * @returns {boolean|string} 返回 true 继续跳转，或返回重定向路径
 */
function toCommonRoute(to, _from) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return true
  } else {
    return '/login'
  }
}

/**
 * 处理权限路由跳转（已登录状态）
 * @param {import('vue-router').RouteLocationNormalizedLoaded} to - 目标路由
 * @param {import('vue-router').RouteLocationNormalized} _from - 来源路由
 * @returns {boolean|string} 返回 true 继续跳转，或返回重定向路径
 */
function toPermissionRoute(to, _from) {
  if (to?.name && commonRoutes.includes(to.name)) {
    return '/home'
  } else {
    return true
  }
}
