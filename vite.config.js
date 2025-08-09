import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vitePluginClean from './plugins/vite-plugin-clean.js'

/**
 * Vite 配置
 * @param {object} context - Vite 上下文
 * @param {string} context.mode - 构建模式
 * @returns {import('vite').UserConfig} Vite 配置对象
 */
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true, // <-- this
        },
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        customCollections: {
          local: FileSystemIconLoader('./src/assets/icons'),
        },
      }),
      vitePluginClean({ includes: ['dist/mockServiceWorker.js'] }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      historyApiFallback: true,
    },
  }
})
