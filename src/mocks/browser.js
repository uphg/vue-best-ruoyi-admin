import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * MSW 浏览器工作进程实例
 * 用于在浏览器环境中拦截和模拟 API 请求
 * @type {import('msw/browser').SetupWorker}
 */
export const worker = setupWorker(...handlers)
