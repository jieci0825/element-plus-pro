import type { ExtractPropTypes, PropType } from 'vue'
import type { DrawerProps } from 'element-plus'

export const proDrawerProps = {
    /**
     * 是否显示 Drawer
     */
    modelValue: {
        type: Boolean as PropType<boolean>,
        default: false
    }
} as const

export type ProDrawerProps =
    | ExtractPropTypes<typeof proDrawerProps>
    | Omit<DrawerProps, 'modelValue'>

export const proDrawerEmits = {
    'update:visible': (value: boolean) => true
}
export type ProDrawerEmits = typeof proDrawerEmits
