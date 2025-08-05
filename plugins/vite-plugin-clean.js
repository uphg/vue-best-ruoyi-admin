import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

/**
 * @typedef {object} CleanOptions
 * @property {string[]} includes - 要清理的文件模式数组
 * @property {boolean} [silent=false] - 是否静默模式
 * @property {'before' | 'after' | 'both'} [timing='after'] - 清理时机
 */

/**
 * @typedef {string | string[]} GlobPattern
 */

/**
 * Vite 插件：用于清理指定文件
 * @param {CleanOptions} options - 插件配置选项
 * @returns {import('vite').Plugin} Vite 插件对象
 */
export default function vitePluginClean(options) {
  const { silent = false, timing = 'after' } = options
  /** @type {import('vite').ResolvedConfig | null} */
  let config = null

  /**
   * 清理文件的异步函数
   * @param {import('vite').ResolvedConfig} config - Vite 解析后的配置
   * @returns {Promise<void>}
   */
  const cleanFiles = async (config) => {
    const { includes } = options
    if (!includes?.length) return

    !silent && console.log('[vite-plugin-clean] Cleaning files...')
    const filesToDelete = await resolveGlobPatterns(includes, config.root)
    filesToDelete.forEach((file) => {
      try {
        fs.rmSync(file, { recursive: true, force: true })
        !silent && console.log(`[vite-plugin-clean] Deleted: ${file}`)
      } catch (err) {
        !silent && console.warn(`[vite-plugin-clean] Failed to delete ${file}:`, err)
      }
    })
  }

  return {
    name: 'vite-plugin-clean',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    buildStart() {
      if (!(timing === 'before' || timing === 'both')) return
      cleanFiles(config)
    },
    closeBundle: () => {
      if (!(timing === 'after' || timing === 'both')) return
      cleanFiles(config)
    },
  }
}

/**
 * 解析 Glob 模式为绝对路径列表（基于项目根目录）
 * @param {string[]} patterns - 文件匹配模式（支持 Glob）
 * @param {string} rootDir - 项目根目录
 * @returns {Promise<string[]>} 匹配到的绝对路径数组
 */
export async function resolveGlobPatterns(patterns, rootDir) {
  // 2. 串行处理每个模式
  /** @type {string[]} */
  const results = []

  for (const pattern of patterns) {
    try {
      if (path.isAbsolute(pattern)) {
        const files = await fg(pattern, {
          cwd: rootDir,
          absolute: true,
        })
        results.push(...files)
        continue
      }

      const absolutePattern = path.resolve(rootDir, pattern)
      const files = await fg(absolutePattern, {
        cwd: rootDir,
        absolute: true,
      })
      results.push(...files)
    } catch (err) {
      console.warn(`[resolveGlob] Failed to process pattern "${pattern}":`, err)
    }
  }

  return results
}
