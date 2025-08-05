import { assign } from 'lodash-es'
import { defineStore } from 'pinia'

/**
 * 用户状态数据结构
 * @typedef {object} UserState
 * @property {string} [id] - 用户ID
 * @property {string} [name] - 用户名称
 * @property {string[]} [rules] - 用户权限规则
 * @property {string} [email] - 用户邮箱
 * @property {string} [token] - 认证令牌
 * @property {import('vue-router').RouteRecordRaw[]} [rawRoutes] - 原始路由数据
 */

/**
 * 用户信息 Store
 * 管理用户的登录状态、个人信息和权限数据
 */
export const useUserStore = defineStore('user', () => {
  /**
   * 用户状态
   * @type {import('vue').UnwrapNestedRefs<{
   *   id: string,
   *   name: string,
   *   rules: string[],
   *   email: string,
   *   token: string,
   *   rawRoutes: import('vue-router').RouteRecordRaw[]
   * }>}
   */
  const state = reactive({
    id: '',
    name: '',
    rules: [],
    email: '',
    token: '',
    rawRoutes: [],
  })

  /**
   * 设置用户数据
   * @param {UserState} data - 用户数据
   */
  function set(data) {
    assign(state, data)
  }

  /**
   * 清空用户数据
   */
  function clear() {
    assign(state, {
      id: '',
      name: '',
      rules: [],
      email: '',
      token: '',
      rawRoutes: [],
    })
  }

  return { ...toRefs(state), set, clear }
})
