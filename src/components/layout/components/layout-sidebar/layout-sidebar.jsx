import { NLayoutContent, NLayoutHeader, NLayoutSider, NMenu } from 'naive-ui'
import { Transition } from 'vue'
import IconLogo from '~icons/local/logo'
import { useSidebarStore } from '@/stores/sidebar'

const LayoutSidebar = defineComponent(() => {
  const sidebar = useSidebarStore()
  /** @type {import('vue').Ref<string[]>} */
  const expandedKeys = ref([])
  /** @type {import('vue').Ref<string | undefined>} */
  const selectedKey = ref()
  const route = useRoute()
  watch(() => route.fullPath, handleMenuExpand)
  watch(() => sidebar.menus, () => handleMenuExpand(), { immediate: true, deep: true })

  handleMenuExpand()

  function handleMenuExpand() {
    const { path } = route

    const matchedMenuItem = findMenuItemByPath(sidebar.menus, path)
    if (matchedMenuItem) {
      selectedKey.value = matchedMenuItem.key

      const expandKeys = getParentKeys(sidebar.menus, matchedMenuItem.key)
      expandedKeys.value = expandKeys
    }
  }

  /**
   * 获取父级键值
   * @param {MenuItem[]} menus 菜单数组
   * @param {string} targetKey 目标键值
   * @param {string[]} parents 父级键值数组
   * @returns {string[]} 父级键值数组
   */
  function getParentKeys(menus, targetKey, parents = []) {
    for (const menu of menus) {
      const newKeys = [...parents, menu.key]

      if (menu.key === targetKey) {
        return parents
      }

      if (menu.children) {
        const result = getParentKeys(menu.children, targetKey, newKeys)
        if (result.length > 0 || menu.children.some(child => child.key === targetKey)) {
          return newKeys
        }
      }
    }
    return []
  }

  /**
   * 根据路径查找菜单项
   * @param {MenuItem[]} menus 菜单数组
   * @param {string} path 路径
   * @returns {MenuItem | null} 菜单项或null
   */
  function findMenuItemByPath(menus, path) {
    for (const menu of menus) {
      if (menu.path === path) {
        return menu
      }
      if (menu.children) {
        const child = findMenuItemByPath(menu.children, path)
        if (child) return child
      }
    }
    return null
  }

  return () => (
    <NLayoutSider
      v-model:value={selectedKey.value}
      v-model:expanded-keys={expandedKeys.value}
      collapsed={sidebar.collapsed}
      bordered
      collapseMode="width"
      collapsedWidth={64}
      width={240}
      nativeScrollbar={false}
      contentClass="flex flex-col h-full"
    >
      <NLayoutHeader class="h-15" bordered>
        <div class={['flex gap-2 h-15 w-60 items-center transition-spacing duration-300', sidebar.collapsed ? 'px-4' : 'px-3']}>
          <IconLogo />
          <Transition name="fade">
            {sidebar.collapsed ? null : <span class="font-size-4.5">Vue Best Admin</span>}
          </Transition>
        </div>
      </NLayoutHeader>
      <NLayoutContent nativeScrollbar={false}>
        <NMenu
          class="flex-1"
          collapsedWidth={64}
          collapsedIconSize={22}
          options={sidebar.menus}
          value={selectedKey.value}
          default-value={selectedKey.value}
          render-label={renderMenuLabel}
          render-icon={renderMenuIcon}
        />
      </NLayoutContent>
    </NLayoutSider>
  )
})

/**
 * 渲染菜单标签
 * @param {import('naive-ui').MenuOption} option 菜单选项
 * @returns {import('vue').VNode} 渲染结果
 */
function renderMenuLabel(option) {
  if ('href' in option) {
    return h('a', { href: option.href, target: '_blank' }, option.label)
  }
  return option.type === 'item'
    ? (
        <RouterLink to={option.path}>
          {option.label}
        </RouterLink>
      )
    : (
        <div>{option.label}</div>
      )
}

/**
 * 渲染菜单图标
 * @param {import('naive-ui').MenuOption} option 菜单选项
 * @returns {import('vue').VNode | boolean | null} 渲染结果
 */
function renderMenuIcon(option) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  if (!option.icon) return
  return h(option.icon)
}

export default LayoutSidebar
