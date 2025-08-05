import { defineStore } from 'pinia'

/**
 * 菜单匹配项数据结构
 * @typedef {object} MenuMatch
 * @property {object} [meta] - 元信息
 * @property {string} [meta.title] - 标题
 * @property {string} [meta.icon] - 图标
 * @property {boolean} [meta.hidden] - 是否隐藏
 * @property {string} path - 路径
 * @property {string} name - 名称
 * @property {any[]} [children] - 子菜单
 */

/**
 * 菜单项数据结构
 * @typedef {object} MenuItem
 * @property {string} label - 菜单标签
 * @property {string} key - 菜单键值（唯一标识）
 * @property {string} [icon] - 图标名称
 * @property {string} [path] - 路由路径
 * @property {'item'|'group'|'divider'|'submenu'} [type] - 菜单类型
 * @property {boolean} [show] - 是否显示
 * @property {MenuMatch[]} [matchs] - 匹配规则
 * @property {MenuItem[]} [children] - 子菜单
 */

/**
 * 侧边栏 Store
 * 管理侧边栏的状态和菜单数据
 */
export const useSidebarStore = defineStore('sidebar', () => {
  /**
   * 是否反色显示
   * @type {import('vue').Ref<boolean>}
   */
  const inverted = ref(false)

  /**
   * 是否收起侧边栏
   * @type {import('vue').Ref<boolean>}
   */
  const collapsed = ref(false)

  /**
   * 菜单映射表（键值对）
   * @type {import('vue').Ref<Map<string, MenuItem>>}
   */
  const menusMap = ref(new Map())

  /**
   * 菜单列表
   * @type {import('vue').Ref<MenuItem[]>}
   */
  const menus = ref([])

  /**
   * 切换侧边栏折叠状态
   */
  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }

  /**
   * 设置侧边栏反色状态
   * @param {boolean} value - 是否反色
   */
  function setInverted(value) {
    inverted.value = value
  }

  /**
   * 设置侧边栏折叠状态
   * @param {boolean} value - 是否折叠
   */
  function setCollapsed(value) {
    collapsed.value = value
  }

  /**
   * 设置菜单列表
   * @param {MenuItem[]} value - 菜单数组
   */
  function setMenus(value) {
    menus.value = value
  }

  /**
   * 设置菜单映射表
   * @param {Map<string, MenuItem>} map - 菜单映射表
   */
  function setMenuMap(map) {
    menusMap.value = map
  }

  return {
    inverted,
    collapsed,
    menus,
    menusMap,
    toggleSidebar,
    setInverted,
    setCollapsed,
    setMenus,
    setMenuMap,
  }
})
