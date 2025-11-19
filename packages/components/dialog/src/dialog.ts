import type { DialogProps } from 'element-plus'

export type ProDialogProps = DialogProps

export const proDialogEmits = {
    'update:modelValue': (value: boolean) => true
}
export type ProDialogEmits = typeof proDialogEmits
