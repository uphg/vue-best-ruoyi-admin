import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { loadRouterGuard } from '@/router/guards/guards'
import App from './app'
import { enableMocking } from './mocks/mocks'
import router from './router/router'
import './assets/styles/main.scss'
import 'virtual:uno.css'

enableMocking().then(() => {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')

  loadRouterGuard(router)
})
