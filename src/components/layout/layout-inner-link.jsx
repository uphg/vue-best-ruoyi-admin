/**
 * 内部链接布局组件
 * @returns {import('vue').VNode} 组件渲染结果
 */
const LayoutInnerLink = defineComponent(() => {
  const route = useRoute()
  /** @type {import('vue').ComputedRef<string>} */
  const link = computed(() => route.meta?.link)
  return () => (
    <div class="h-[calc(100vh-var(--header-height)-var(--nav-tag-height))] w-full">
      <iframe class="border-none h-full w-full" src={link.value} />
    </div>
  )
})

export default LayoutInnerLink
