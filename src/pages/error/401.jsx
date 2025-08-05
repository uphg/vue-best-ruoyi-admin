import { defineComponent } from 'vue'

const UnauthorizedPage = defineComponent(() => {
  return () => (
    <div>
      <h2>401</h2>
    </div>
  )
})

export default UnauthorizedPage
