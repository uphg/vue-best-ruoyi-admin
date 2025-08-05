import { NLayoutHeader } from 'naive-ui'
import LayoutNavTags from '../layout-nav-tags/layout-nav-tags'
import SidebarToggle from '../layout-sidebar/sidebar-toggle'
import HeaderBreadcrumb from './header-breadcrumb'
import UserDropdown from './user-dropdown'

/**
 * 页面头部布局组件
 * @returns {import('vue').VNode} 组件渲染结果
 */

const LayoutHeader = defineComponent(() => {
  return () => (
    <NLayoutHeader class="flex flex-col h-[calc(var(--header-height)+var(--nav-tag-height))]">
      <NLayoutHeader class="px-4 flex gap-2 h-[var(--header-height)] items-center" bordered>
        <SidebarToggle />
        <HeaderBreadcrumb />
        <div class="ml-auto flex gap-4 items-center">
          <UserDropdown />
        </div>
      </NLayoutHeader>
      <LayoutNavTags />
    </NLayoutHeader>
  )
})

export default LayoutHeader
