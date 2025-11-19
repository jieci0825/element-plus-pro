import type { DialogProps } from 'element-plus'
import type { ProFormProps } from '../../form'

export type ProFormDialogProps = DialogProps & {
    formProps: Omit<ProFormProps, 'modelValue'>
    formData: Record<string, any>
}

export const proFormDialogEmits = {
    'update:modelValue': (value: boolean) => true,
    'update:formData': (value: Record<string, any>) => true,
    submit: (value: any) => true
}
export type ProFormDialogEmits = typeof proFormDialogEmits
