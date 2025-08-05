/**
 * 启用 Mock 服务
 * @returns {Promise<void>}
 */
export async function enableMocking() {
  if (!import.meta.env.DEV) return

  const { worker } = await import('./browser')
  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
