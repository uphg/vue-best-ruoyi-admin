import { NLayout, NLayoutContent } from 'naive-ui'
import { defineComponent } from 'vue'
import LayoutHeader from './components/layout-header/layout-header.jsx'
import LayoutSidebar from './components/layout-sidebar/layout-sidebar.jsx'

const LayoutDefault = defineComponent(() => {
  return () => (
    <NLayout contentClass="h-100vh flex flex-col" nativeScrollbar={false}>
      <NLayout hasSider class="flex-1">
        <LayoutSidebar />
        <NLayout contentClass="flex flex-col">
          <LayoutHeader />
          <NLayoutContent class="flex-1" native-scrollbar={false}>
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NLayout>
  )
})

export default LayoutDefault
