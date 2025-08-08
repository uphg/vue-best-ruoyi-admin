import { useLoadingBar } from 'naive-ui'

let loadingBarInstance = null
let loadingInstance = null

export function useNaiveLoadingBar() {
  if (!loadingBarInstance) {
    loadingBarInstance = useLoadingBar()
  }
  return loadingBarInstance
}

export function useNaiveLoading() {
  return {
    start: () => {
      const loadingBar = useNaiveLoadingBar()
      loadingBar.start()
    },
    finish: () => {
      const loadingBar = useNaiveLoadingBar()
      loadingBar.finish()
    },
    error: () => {
      const loadingBar = useNaiveLoadingBar()
      loadingBar.error()
    },
  }
}

export function createLoading(options = {}) {
  const defaultOptions = {
    content: '加载中...',
    duration: 0,
    ...options,
  }
  
  // 由于Naive UI没有全局loading服务，我们创建一个简单的实现
  return {
    close: () => {
      if (loadingInstance) {
        loadingInstance = null
      }
    },
    ...defaultOptions,
  }
}

export default {
  useNaiveLoadingBar,
  useNaiveLoading,
  createLoading,
}