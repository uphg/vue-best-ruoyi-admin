import { pick } from 'lodash-es'
import { NButton, NModal, NScrollbar } from 'naive-ui'
import IconX from '~icons/lucide/x'
import { mergeClass } from '@/utils/merge-class'
import PureButton from '../pure-button/pure-button'

const defaultClass = {
  wrap: 'bg-white rounded-lg min-w-sm max-w-2xl',
  header: 'flex items-center justify-between p-4',
  title: 'text-lg',
  content: 'p-4',
  footer: 'flex items-center justify-end gap-3 p-4',
}

const NModalPropNames = ['onAfterEnter', 'onAfterLeave', 'onEsc', 'onMaskClick', 'maskClosable']

const sizeMap = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  huge: 'max-w-2xl',
}

export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    title: String,
    showClose: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    confirmLoading: Boolean,
    confirmText: { type: String, default: '确认' },
    cancelText: { type: String, default: '取消' },
    onConfirm: Function,
    onCancel: Function,
    onClose: Function,
    onAfterEnter: Function,
    onAfterLeave: Function,
    onEsc: Function,
    onMaskClick: Function,
    maskClosable: { type: Boolean, default: true },
    headerClass: [String],
    contentClass: [String],
    footerClass: [String],
    size: { type: String, default: 'medium' },
  },
  emits: ['update:visible', 'confirm', 'cancel', 'close'],
  inheritAttrs: false,
  setup(props, { emit, slots, attrs }) {
    const classNames = computed(() =>
      mergeClass(
        defaultClass.wrap,
        sizeMap[props.size || 'medium'],
        attrs.class,
      ),
    )

    function onUpdateVisible(value) {
      emit('update:visible', value)
    }

    async function handleConfirm(e) {
      emit('confirm')
      let shouldClose = true
      try {
        const result = props.onConfirm?.(e)
        if (result instanceof Promise) {
          shouldClose = await result
        } else if (typeof result === 'boolean') {
          shouldClose = result
        }
      } catch (error) {
        shouldClose = false
        console.error('Confirm handler error:', error)
      }
      if (shouldClose !== false) {
        onUpdateVisible(false)
      }
    }

    async function handleCancel(e) {
      emit('cancel')
      props.onCancel?.(e)
      onUpdateVisible(false)
    }

    async function handleClose(e) {
      emit('close')
      props.onClose?.(e)
      onUpdateVisible(false)
    }

    return () => (
      <NModal
        {...attrs}
        class={classNames.value}
        show={props.visible}
        onUpdate:show={onUpdateVisible}
        {...pick(props, NModalPropNames)}
      >
        <div>
          {(slots.header || props.title || props.showClose) && (
            <div class={mergeClass(defaultClass.header, props.headerClass)}>
              {slots.header
                ? slots.header()
                : <h3 class={defaultClass.title}>{props.title}</h3>}
              {props.showClose && (
                <PureButton onClick={handleClose} class="ml-2">
                  <IconX class="h-4.5 w-4.5" />
                </PureButton>
              )}
            </div>
          )}

          <div>
            <NScrollbar class="max-h-[calc(100vh-60px-66px-(20px*2))]">
              <div class={mergeClass(defaultClass.content, props.contentClass)}>
                {slots.default?.()}
              </div>
            </NScrollbar>
          </div>

          {props.showFooter && (slots.footer || props.showFooter) && (
            <div class={mergeClass(defaultClass.footer, props.footerClass)}>
              {slots.footer
                ? slots.footer()
                : (
                    <>
                      <NButton onClick={handleCancel}>{props.cancelText}</NButton>
                      <NButton
                        type="primary"
                        loading={props.confirmLoading}
                        onClick={handleConfirm}
                      >
                        {props.confirmText}
                      </NButton>
                    </>
                  )}
            </div>
          )}
        </div>
      </NModal>
    )
  },
}
