import { cn } from '@/utils/merge-class'

/**
 * 纯净输入框组件
 * @returns {import('vue').VNode} 组件渲染结果
 */
const PureInput = defineComponent({
  props: {
    /** @type {import('vue').PropType<string | Array | object>} */
    class: {
      type: [String, Array, Object],
    },
    /** @type {import('vue').PropType<string>} */
    value: {
      type: String,
      default: '',
    },
    /** @type {import('vue').PropType<string>} */
    placeholder: {
      type: String,
      default: '',
    },
    /** @type {import('vue').PropType<'text'|'password'|'email'|'number'|'search'>} */
    type: {
      type: String,
      default: 'text',
    },
    /** @type {import('vue').PropType<boolean>} */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<boolean>} */
    readonly: {
      type: Boolean,
      default: false,
    },
    /** @type {import('vue').PropType<(event: Event) => void>} */
    onInput: {
      type: Function,
      default: undefined,
    },
    /** @type {import('vue').PropType<(event: FocusEvent) => void>} */
    onFocus: {
      type: Function,
      default: undefined,
    },
    /** @type {import('vue').PropType<(event: FocusEvent) => void>} */
    onBlur: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['update:value', 'input', 'focus', 'blur'],
  setup(props, { emit }) {
    /**
     * 处理输入事件
     * @param {Event} event 输入事件
     */
    const handleInput = (event) => {
      /** @type {HTMLInputElement} */
      const target = event.target
      emit('update:value', target.value)
      emit('input', event)
      props.onInput?.(event)
    }

    /**
     * 处理获取焦点事件
     * @param {FocusEvent} event 焦点事件
     */
    const handleFocus = (event) => {
      emit('focus', event)
      props.onFocus?.(event)
    }

    /**
     * 处理失去焦点事件
     * @param {FocusEvent} event 焦点事件
     */
    const handleBlur = (event) => {
      emit('blur', event)
      props.onBlur?.(event)
    }

    return () => (
      <input
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
        class={mergeClass(
          'px-3 py-2 border border-gray-300 rounded-3px text-sm transition-colors duration-200',
          'focus:outline-none',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500',
          'placeholder:text-gray-400',
          props.class,
        )}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  },
})

export default PureInput
