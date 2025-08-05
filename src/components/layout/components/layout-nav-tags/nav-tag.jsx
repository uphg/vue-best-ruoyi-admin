import Tag from '@/components/ui/tag/tag.jsx'

/**
 * 导航标签组件
 * @returns {import('vue').VNode} 组件渲染结果
 */
const NavTag = defineComponent({
  props: {
    /** @type {import('vue').PropType<boolean>} */
    active: {
      type: Boolean,
      required: true,
    },
    /** @type {import('vue').PropType<boolean>} */
    closable: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<Function>} */
    onClick: Function,
    /** @type {import('vue').PropType<Function>} */
    onClose: Function,
  },
  setup(props, { slots }) {
    return () => {
      const { active, closable, onClick, onClose } = props
      return (
        <Tag hue={active ? 'blue' : ''} closable={closable} onClick={onClick} onClose={onClose}>
          <span>{slots.default?.()}</span>
        </Tag>
      )
    }
  },
})

export default NavTag
