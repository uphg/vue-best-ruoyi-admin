import { setupServer } from 'msw/node'
import { handlers } from './handlers.js'

/**
 * Node.js 环境下的 MSW server 实例
 * @type {import('msw/node').SetupServerApi}
 */
export const server = setupServer(...handlers)
