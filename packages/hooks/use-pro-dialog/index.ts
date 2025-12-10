import { h, createApp, ref } from 'vue'
import type { Component, Ref } from 'vue'
import { ProDialog } from '@coderjc/element-plus-pro-components'
import type { ProDialogProps } from '@coderjc/element-plus-pro-components'
import type { ExtractComponentProps } from '@coderjc/element-plus-pro-utils'

interface UseProDialogOptions<T = any> {
    props?: ExtractComponentProps<T>
    dialogProps?: Partial<ProDialogProps>
}

interface UseProDialogReturn<T = any> {
    destory: () => void
    instance: Ref<T | null>
}

export function useProDialog<T extends Component>(
    component: T,
    options: UseProDialogOptions<T> = {}
): UseProDialogReturn<T> {
    const { props, dialogProps } = options
    const visible = ref(true)

    const _dialogProps = Object.assign(
        {},
        {
            title: '标题',
            onClosed: () => {
                destory(0)
            }
        },
        dialogProps
    )

    const compInstance = ref<T | null>(null)

    function destory(delay = 1000) {
        visible.value = false

        const _reset = () => {
            compInstance.value = null
            app.unmount()
            container.remove()
        }

        // 外部调用 destory 方法，通过延迟关闭，避免动画没有结束就被销毁
        delay > 0 ? setTimeout(_reset, delay) : _reset()
    }

    const dialog = h(
        ProDialog,
        {
            ..._dialogProps,
            modelValue: visible
        },
        {
            default: () => h(component, { ref: compInstance, ...props })
        }
    )

    const app = createApp(dialog)

    // 创建一个div容器，并挂载到body上
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 挂载到容器上
    app.mount(container)

    return {
        destory,
        instance: compInstance
    } as UseProDialogReturn<T>
}
