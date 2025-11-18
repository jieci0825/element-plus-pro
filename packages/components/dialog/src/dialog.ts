import type { ExtractPropTypes, PropType } from 'vue'
import type { DialogProps } from 'element-plus'

export const proDialogProps = {
    /**
     * 是否显示 Dialog
     */
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * 是否启用高度自适应，默认 true
     */
    autoHeight: {
        type: Boolean as PropType<boolean>,
        default: true
    }
} as const

export type ProDialogProps =
    | ExtractPropTypes<typeof proDialogProps>
    | Omit<DialogProps, 'modelValue'>

export const proDialogEmits = {
    'update:modelValue': (value: boolean) => true
}
export type ProDialogEmits = typeof proDialogEmits
