import { NIcon } from 'naive-ui'
import ArrowLeftToLine from '~icons/lucide/chevron-left'
import ArrowRightToLine from '~icons/lucide/chevron-right'
import PureButton from '@/components/ui/pure-button/pure-button.jsx'
import { useSidebarStore } from '@/stores/sidebar'

/**
 * 侧边栏切换按钮组件
 * @returns {import('vue').VNode} 组件渲染结果
 */

const SidebarToggle = defineComponent(() => {
  const sidebar = useSidebarStore()
  return () => (
    <PureButton class="flex h-8 w-8 items-center justify-center" onClick={sidebar.toggleSidebar}>
      <NIcon class="text-xl">
        {sidebar.collapsed ? <ArrowRightToLine /> : <ArrowLeftToLine /> }
      </NIcon>
    </PureButton>
  )
})

export default SidebarToggle
