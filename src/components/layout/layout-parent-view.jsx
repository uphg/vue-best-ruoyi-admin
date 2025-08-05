/**
 * 父级视图布局组件
 * @returns {import('vue').VNode} 组件渲染结果
 */
const LayoutParentView = defineComponent(() => {
  return () => (
    <RouterView></RouterView>
  )
})

export default LayoutParentView
