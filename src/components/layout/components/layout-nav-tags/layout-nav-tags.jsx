import { NLayoutHeader } from 'naive-ui'
import { useNavTagsStore } from '@/stores/nav-tags'
import NavTag from './nav-tag.jsx'

/**
 * 导航标签布局组件
 * @returns {import('vue').VNode} 组件渲染结果
 */

const LayoutNavTags = defineComponent(() => {
  /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
  const tagsWrapRef = shallowRef(null)
  const navTagsStore = useNavTagsStore()
  const route = useRoute()
  const router = useRouter()

  watch(
    () => route.name,
    () => {
      const tag = {
        name: route.name,
        title: route.meta?.title,
        path: route.path,
      }
      navTagsStore.append(tag)
      navTagsStore.setActive(route.name)
    },
    { immediate: true },
  )

  /**
   * 处理标签点击
   * @param {import('@/stores/nav-tags').NavTagItem} item 标签项
   * @param {number} _index 索引
   */
  function onItemClick(item, _index) {
    navTagsStore.setActive(item.name)
    router.push(item.path)
  }

  /**
   * 处理标签关闭
   * @param {import('@/stores/nav-tags').NavTagItem} item 标签项
   * @param {number} index 索引
   */
  function onItemClose(item, index) {
    if (navTagsStore.tags.length === 1) return
    if (item.name === route.name) {
      if (index === navTagsStore.tags.length - 1) {
        router.push(navTagsStore.tags[index - 1].path)
      } else {
        router.push(navTagsStore.tags[index + 1].path)
      }
    }
    navTagsStore.remove(item.name)
  }

  /**
   * 处理标签滚轮事件
   * @param {WheelEvent} e 滚轮事件
   */
  function onTagsWheel(e) {
    e.preventDefault()
    const deltaY = e.deltaY
    tagsWrapRef.value?.scrollTo({
      left: tagsWrapRef.value.scrollLeft + deltaY * 1.5,
      behavior: 'smooth',
    })
  }

  return () => (
    <NLayoutHeader bordered class="tags h-[var(--nav-tag-height)] w-full">
      <div
        ref={tagsWrapRef}
        class="tags-wrapper flex h-[var(--nav-tag-height)] w-full items-center overflow-auto"
        onWheel={onTagsWheel}
      >
        <div class="px-6 py-1 flex gap-2">
          {navTagsStore.tags.map((item, index) => (
            <NavTag
              key={item.name}
              active={navTagsStore.active === item.name}
              closable={navTagsStore.tags.length > 1}
              onClick={() => onItemClick(item, index)}
              onClose={() => onItemClose(item, index)}
            >
              {item.title}
            </NavTag>
          ))}
        </div>
      </div>
    </NLayoutHeader>
  )
})

export default LayoutNavTags
