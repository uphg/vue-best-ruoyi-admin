/**
 * @typedef {object} RouteMeta
 * @property {string} title - 路由标题
 * @property {string} icon - 路由图标
 * @property {string} [link] - 外部链接地址
 */

/**
 * @typedef {object} RouteItem
 * @property {string} path - 路由路径
 * @property {string} [redirect] - 重定向路径
 * @property {string} component - 组件名称
 * @property {boolean} [mergeSingleChild] - 是否合并单个子项
 * @property {RouteMeta} [meta] - 路由元信息
 * @property {RouteItem[]} [children] - 子路由数组
 */

/**
 * 路由数据配置
 * 定义了系统的路由结构和导航菜单
 * @type {RouteItem[]}
 */
export const routeDate = [
  {
    path: '/about',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'about/about-page',
        meta: {
          title: '关于',
          icon: 'user-search',
        },
      },
    ],
  },
  {
    path: '/icon',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'icon/icon-page',
        meta: {
          title: '图标',
          icon: 'audio-waveform',
        },
      },
    ],
  },

  {
    path: '/request',
    component: 'Default',
    mergeSingleChild: true,
    children: [
      {
        path: 'base',
        component: 'request/request-page',
        meta: {
          title: '请求示例',
          icon: 'arrow-up-right',
        },
      },
    ],
  },
  {
    path: '/system',
    redirect: 'noRedirect',
    component: 'Default',
    meta: {
      title: '系统管理',
      icon: 'settings',
    },
    children: [
      {
        path: 'user',
        component: 'system/user/user-page',
        meta: {
          title: '用户管理',
          icon: 'user',
        },
      },
      {
        path: 'role',
        component: 'system/role/role-page',
        meta: {
          title: '角色管理',
          icon: 'user-cog',
        },
      },
      {
        path: 'menu',
        component: 'system/menu/menu-page',
        meta: {
          title: '菜单管理',
          icon: 'layout-list',
        },
      },
      {
        path: 'embed',
        redirect: 'noRedirect',
        component: 'ParentView',

        meta: {
          title: '内嵌网页',
          icon: 'globe',
        },
        children: [
          {
            path: 'juejin',
            component: 'InnerLink',
            meta: { title: '掘金', icon: 'link', link: 'https://juejin.cn/' },
          },
          {
            path: 'vite',
            component: 'InnerLink',
            meta: { title: 'Vite.js', icon: 'link', link: 'https://vite.dev/' },
          },
          {
            path: 'vue',
            component: 'InnerLink',
            meta: { title: 'Vue.js', icon: 'link', link: 'https://vuejs.org/' },
          },
        ],
      },
    ],
  },
]
