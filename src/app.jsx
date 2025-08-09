import { NDialogProvider, NMessageProvider } from 'naive-ui'
import { defineComponent } from 'vue'

const AppWrap = defineComponent((_, { slots }) => {
  return () => (
    <NMessageProvider>
      <NDialogProvider>
        {slots.default?.()}
      </NDialogProvider>
    </NMessageProvider>
  )
})

const App = defineComponent(() => {
  return () => (
    <AppWrap>
      <RouterView />
    </AppWrap>
  )
})

export default App
