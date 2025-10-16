import { UPDATE_MODEL_EVENT } from '@coderjc/element-plus-pro-constants'
import type { ExtractPropTypes, PropType, Component } from 'vue'
import type { ProFormItemConfig } from './form-item.type'
import type { ColProps, FormInstance } from 'element-plus'

export interface FooterBtn {
    text?: string
    icon?: string | Component
    hide?: boolean
}

export type ProFormFooterConfig = {
    align?: 'left' | 'center' | 'right'
    onSubmit?: Function
    onReset?: Function
    col?: Partial<ColProps>
    resetBtn?: FooterBtn | boolean
    submitBtn?: FooterBtn | boolean
}

export const proFormProps = {
    /**
     * @description 表单数据
     */
    modelValue: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },

    /**
     * @description 表单项配置
     */
    formItems: {
        type: Array as PropType<ProFormItemConfig[]>,
        default: () => []
    },

    /**
     * @description 表单项间距
     */
    gutter: {
        type: Number as PropType<number>,
        default: 0
    },

    /**
     * @description 表单项所占栅格数
     */
    col: {
        type: Object as PropType<Partial<ColProps>>,
        default: () => ({ span: 24 })
    },

    /**
     * @description 页脚配置
     */
    footerConfig: {
        type: [Object, null] as PropType<ProFormFooterConfig | null>,
        default: () => ({})
    }

    // 其他属性则会直接透传给 el-form
} as const

export type ProFormProps = ExtractPropTypes<typeof proFormProps> &
    Omit<FormInstance['$props'], 'modelValue'>

export const proFormEmits = {
    [UPDATE_MODEL_EVENT]: (value: any) => true,
    submit: (value: any, errInfo: any) => true,
    reset: () => true
}
export type ProFormEmits = typeof proFormEmits
