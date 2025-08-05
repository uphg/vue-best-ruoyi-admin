import { http } from '@/utils/http-lite'

/**
 * @typedef {object} RouteData
 * @property {string} name - 路由名称
 * @property {string} path - 路由路径
 * @property {boolean} hidden - 是否隐藏
 * @property {string} redirect - 重定向路径
 * @property {'Default' | 'ParentView'} component - 组件类型
 * @property {true} mergeSingleChild - 合并单个子项
 * @property {RouteData[]} children - 子路由数据
 */

/**
 * @typedef {object} UserInfo
 * @property {string} [id] - 用户ID
 * @property {string} [name] - 用户名称
 * @property {string[]} [rules] - 用户权限规则
 * @property {string} [email] - 用户邮箱
 * @property {string} [token] - 用户令牌
 */

/**
 * @typedef {object} LoginData
 * @property {string} username - 用户名
 * @property {string} password - 密码
 */

/**
 * 获取路由数据
 * @returns {Promise<RouteData[]>} 路由数据数组
 */
export function apiGetRouteData() {
  return http.get('/api/route-data')
}

/**
 * 获取用户信息
 * @returns {Promise<Partial<UserInfo>>} 用户信息对象
 */
export function apiGetUserInfo() {
  return http.get('/api/user-info')
}

/**
 * 用户登录
 * @param {LoginData} data - 登录数据
 * @returns {Promise<any>} 登录响应
 */
export function apiLogin(data) {
  return http.post('/api/login', data)
}
