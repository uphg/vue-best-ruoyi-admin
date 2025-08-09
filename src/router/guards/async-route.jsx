import { NIcon } from 'naive-ui'
import { h } from 'vue'
import IconArrowUpRight from '~icons/lucide/arrow-up-right'
import IconAudioWaveform from '~icons/lucide/audio-waveform'
import IconGlobe from '~icons/lucide/globe'
import IconLayoutList from '~icons/lucide/layout-list'
import IconLink from '~icons/lucide/link'
import IconSettings from '~icons/lucide/settings'
import IconShell from '~icons/lucide/shell'
import IconUser from '~icons/lucide/user'
import IconUserCog from '~icons/lucide/user-cog'
import IconUserSearch from '~icons/lucide/user-search'
import LayoutDefault from '@/components/layout/layout-default'
import LayoutInnerLink from '@/components/layout/layout-inner-link'
import LayoutParentView from '@/components/layout/layout-parent-view'

/**
 * 页面模块动态导入映射
 * @type {Record<string, () => Promise<any>>}
 */
const pagesModule = import.meta.glob('@/pages/**/*.vue')

/**
 * 布局组件映射
 * @type {Record<string, import('vue').Component>}
 */
const layoutsMap = {
  Default: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

/**
 * 图标映射
 * @type {Record<string, () => import('vue/jsx-runtime').JSX.Element>}
 */
const iconsMap = createIconsMap({
  'user-search': IconUserSearch,
  'audio-waveform': IconAudioWaveform,
  'arrow-up-right': IconArrowUpRight,
  'settings': IconSettings,
  'user': IconUser,
  'user-cog': IconUserCog,
  'layout-list': IconLayoutList,
  'globe': IconGlobe,
  'link': IconLink,
  'shell': IconShell,
})

/**
 * 创建异步路由
 * @param {any[]} data - 路由数据
 * @returns {any[]} 异步路由数据
 */
export function createAsyncRoutes(data) {
  const routes = cloneJSON(data)
  return baseCreateRoutes(routes)
}

/**
 * 基础路由创建函数
 * @param {any[]} routes - 路由配置数组
 * @param {any[]} [paths] - 路径数组
 * @returns {any[]} 处理后的路由数组
 */
function baseCreateRoutes(routes, paths = []) {
  const result = []
  for (const route of routes) {
    const { component, children, path, name, ...rest } = route
    const newComponent = getComponent(component)
    const newPaths = [...paths, path]
    const item = {
      component: newComponent,
      path,
      name: name ?? convertToPascalCase(newPaths),
      ...rest,
    }
    if (children) {
      item.children = baseCreateRoutes(children, newPaths)
    }
    result.push(item)
  }
  return result
}

/**
 * 创建侧边栏菜单
 * @param {any[]} data - 路由数据
 * @returns {{menus: any[], menusMap: Map<string, any>}} 侧边栏菜单数据
 */
export function createSidebarMenus(data) {
  const routes = cloneJSON(data)
  const menusMap = new Map()
  const menus = baseCreateMenus(routes, menusMap)
  return { menus, menusMap }
}

/**
 * 基础菜单创建函数
 * @param {any[]} routes - 路由配置数组
 * @param {Map<string, any>} menusMap - 菜单映射
 * @param {object} [options] - 选项
 * @param {string[]} [options.paths] - 路径数组
 * @param {any[]} [options.matchs] - 匹配数组
 * @returns {any[]} 菜单数组
 */
function baseCreateMenus(routes, menusMap, options) {
  const { paths = [], matchs = [] } = options ?? {}
  const menus = []
  for (const route of routes) {
    const { path, name, meta, children, hidden, ...rest } = (route?.alwaysShow ? route : getOnlyChildMenu(route)) ?? {}
    if (hidden === true) continue
    const newPaths = [...paths, path]
    const newPath = pathJoin(newPaths)
    const item = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      // icon: meta?.icon && iconsMap?.[meta.icon],
      show: hidden !== true,
      matchs: [...matchs, { meta, path, name }],
      ...rest,
    }
    menusMap.set(item.key, item)
    if (children) {
      item.type = 'submenu'
      item.children = baseCreateMenus(children, menusMap, { paths: newPaths, matchs: item.matchs })
    }
    menus.push(item)
  }
  return menus
}

/**
 * 根据组件路径获取组件
 * @param {string} componentPath - 组件路径
 * @returns {import('vue').Component|Function} 组件
 */
function getComponent(componentPath) {
  const layout = layoutsMap?.[componentPath]
  if (layout) return layout

  // 清理路径格式
  const cleanPath = componentPath
    .replace(/^views\//, '')
    .replace(/\.(vue|jsx?|tsx?)$/, '')
    .replace(/^\//, '')

  // 确保路径格式匹配 Vite 的 glob 导入格式
  console.log('cleanPath')
  console.log(cleanPath)
  const modulePath = `/src/pages/${cleanPath}.vue`

  // 返回匹配的组件
  const component = pagesModule[modulePath]
  if (!component) {
    console.error(`未找到组件: ${modulePath}, 可用路径:`, Object.keys(pagesModule).slice(0, 10))
    return LayoutDefault
  }
  return component
}

/**
 * 获取唯一子菜单
 * @param {any} route - 路由配置
 * @returns {any} 处理后的路由配置
 */
function getOnlyChildMenu(route) {
  if (!route.children?.length) return route
  let child = route
  while (child?.children?.length) {
    const visibleChildren = child.children.filter(item => item.hidden !== true)
    if (visibleChildren.length === 0) break
    const firstVisibleChild = visibleChildren[0]
    const path = pathJoin([route.path, firstVisibleChild.path])
    child = { ...firstVisibleChild, path }
  }
  return child
}

/**
 * 路径拼接
 * @param {string[]} paths - 路径数组
 * @returns {string} 拼接后的路径
 */
function pathJoin(paths) {
  const validPaths = paths.filter(isUnnil)
  return validPaths.length > 0 ? `/${validPaths.join('/').replace(/^\//, '')}` : '/'
}

/**
 * 检查值是否非空
 * @param {any} value - 要检查的值
 * @returns {boolean} 是否非空
 */
function isUnnil(value) {
  return value !== undefined && value !== null && value !== ''
}

/**
 * 深拷贝 JSON 对象
 * @template T
 * @param {T} json - 要拷贝的对象
 * @returns {T} 拷贝后的对象
 */
function cloneJSON(json) {
  return JSON.parse(JSON.stringify(json))
}

/**
 * 将字符串数组转换为 PascalCase 格式的字符串（首字母大写，无分隔符）
 * @param {string[]} arr - 输入字符串数组，可能包含路径（/）、连字符（-）或空格
 * @returns {string} 转换后的 PascalCase 字符串，自动忽略空项
 */
function convertToPascalCase(arr) {
  return arr
    .filter(item => item?.trim().length > 0)
    .flatMap((item) => {
      return item.split(/[/\- ]+/)
        .filter(part => part.trim().length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    })
    .join('')
}

/**
 * 创建图标映射
 * @param {Record<string, import('vue').Component>} iconsMap - 图标组件映射
 * @returns {Record<string, () => import('vue/jsx-runtime').JSX.Element>} 渲染函数映射
 */
function createIconsMap(iconsMap) {
  const icons = Object.entries(iconsMap)
  const result = {}
  for (const [key, value] of icons) {
    result[key] = createRenderIcon(value)
  }

  return result
}

/**
 * 创建图标渲染函数
 * @param {import('vue').Component} icon - 图标组件
 * @returns {() => import('vue/jsx-runtime').JSX.Element} 渲染函数
 */
function createRenderIcon(icon) {
  return () => (
    <NIcon>
      {h(icon)}
    </NIcon>
  )
}
