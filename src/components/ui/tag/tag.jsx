import { NIcon } from 'naive-ui'
import IconX from '~icons/lucide/x'
import { cn } from '@/utils/class-merge'
import PureButton from '../pure-button/pure-button.jsx'

/**
 * 标签组件
 * @returns {import('vue').VNode} 组件渲染结果
 */

const Tag = defineComponent({
  props: {
    /** @type {import('vue').PropType<string>} */
    class: {
      type: String,
      default: '',
    },
    /** @type {import('vue').PropType<boolean>} */
    bordered: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<boolean>} */
    checkable: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<boolean>} */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<boolean>} */
    round: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<string>} */
    hue: {
      type: String,
      default: undefined,
    },
    /** @type {import('vue').PropType<Function>} */
    onClick: {
      type: Function,
      default: undefined,
    },
    /** @type {import('vue').PropType<boolean>} */
    closable: Boolean,
    /** @type {import('vue').PropType<Function>} */
    onClose: Function,
  },
  emits: ['update:checked'],
  setup(props, { slots, emit }) {
    const checked = ref(false)

    /**
     * 处理点击事件
     * @param {MouseEvent} event 鼠标事件
     */
    const handleClick = (event) => {
      if (props.disabled) return

      if (props.checkable) {
        checked.value = !checked.value
        emit('update:checked', checked.value)
      }

      props.onClick?.(event)
    }

    const tagClasses = computed(() => {
      return cn(
      // 基础样式
        'inline-flex items-center px-1.5 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none',

        // 默认样式
        !props.hue && !props.checkable && 'text-gray-700 bg-gray-100 hover:bg-gray-200',

        // 边框样式
        props.bordered ? 'border border-gray-300' : 'border-none',

        // 圆角样式
        props.round ? 'rounded-full' : 'rounded-xs',

        // 禁用样式
        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',

        // 可选择样式
        props.checkable && checked.value && 'bg-blue-500 text-white border-blue-500',
        props.checkable && !checked.value && 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',

        // 主题色样式 (当不可选择时生效)
        props.hue && !props.checkable && {
          red: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
          blue: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
          green: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
          yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
          purple: 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
          pink: 'bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200',
          indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200',
          gray: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200',
        }[props.hue],

        // 用户自定义类名
        props.class,
      )
    })

    /**
     * 处理关闭事件
     * @param {MouseEvent} event 鼠标事件
     */
    function handleClose(event) {
      event.stopPropagation()
      props.onClose?.(event)
    }

    return () => (
      <div
        class={tagClasses.value}
        onClick={handleClick}
      >
        {slots.default?.()}
        {props.closable && (
          <PureButton class="ml-.5 p-.5 inline-flex cursor-pointer items-center" onClick={handleClose}>
            <NIcon size="14">
              <IconX />
            </NIcon>
          </PureButton>
        )}
      </div>
    )
  },
})

export default Tag
