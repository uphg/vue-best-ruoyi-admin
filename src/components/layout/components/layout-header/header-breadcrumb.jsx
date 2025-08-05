import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui'
import { useSidebarStore } from '@/stores/sidebar'

/**
 * @typedef {object} BreadcrumbItem
 * @property {string} label 标签
 * @property {string} key 唯一标识
 * @property {string} name 名称
 * @property {any[]} [children] 子项
 */

/**
 * @typedef {object} MenuMatch
 * @property {object} [meta] 元数据
 * @property {string} [meta.title] 标题
 * @property {string} path 路径
 * @property {string} name 名称
 * @property {any[]} [children] 子项
 */

export default defineComponent({
  name: 'BreadcrumbComponent',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const sidebar = useSidebarStore()
    /** @type {import('vue').ComputedRef<BreadcrumbItem[]>} */
    const breadItems = computed(() => {
      const current = sidebar.menusMap?.get(route?.name)
      if (!current?.matchs) return []

      const matchs = current.matchs.filter(item => !!item?.name)
      if (!matchs?.length) return []

      return matchs.map(({ meta, path, name, children }) => ({
        label: meta?.title || name,
        key: path,
        name,
        children,
      }))
    })

    /**
     * 获取下拉选项
     * @param {BreadcrumbItem} item 面包屑项
     * @returns {any[]} 下拉选项
     */
    function getDropOptions(item) {
      return sidebar.menusMap?.get(item.name)?.children || []
    }

    /**
     * 处理下拉选择
     * @param {string} name 路由名称
     */
    function handleDropSelect(name) {
      router.push({ name })
    }

    return () => {
      if (!breadItems.value?.length) return null

      return (
        <NBreadcrumb>
          {breadItems.value.map((item, index) => {
            const isLast = index === breadItems.value.length - 1
            const dropOptions = isLast ? [] : getDropOptions(item)

            return (
              <NBreadcrumbItem key={item.key}>
                <NDropdown
                  options={dropOptions}
                  onSelect={handleDropSelect}
                >
                  <div class="m--1 p-1 border-inherit flex items-center">
                    {item.label}
                  </div>
                </NDropdown>
              </NBreadcrumbItem>
            )
          })}
        </NBreadcrumb>
      )
    }
  },
})
