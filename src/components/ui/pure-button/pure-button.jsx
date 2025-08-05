import { cn } from '@/utils/class-merge'

/**
 * 纯净按钮组件
 * @returns {import('vue').VNode} 组件渲染结果
 */
const PureButton = defineComponent({
  props: {
    /** @type {import('vue').PropType<string | Array | object>} */
    class: {
      type: [String, Array, Object],
    },
    /** @type {import('vue').PropType<(event: MouseEvent) => void>} */
    onClick: {
      type: Function,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () => (
      <button
        {...props}
        class={cn('text-black rounded-3px border-none bg-transparent cursor-pointer transition-colors duration-300 focus:outline-none active:bg-neutral-800/13 focus:bg-neutral-800/9 hover:bg-neutral-800/9', props.class)}
      >
        {slots.default?.()}
      </button>
    )
  },
})

export default PureButton
