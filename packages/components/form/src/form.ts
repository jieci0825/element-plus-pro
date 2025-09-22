import { UPDATE_MODEL_EVENT } from '@jc/element-plus-pro-constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ProFormItemType } from './form-item.type'
import type { ColProps, FormInstance } from 'element-plus'

type StringOrUndefined = string | undefined
export type ProFormFooterConfig = {
    // 重置、搜索
    hideBtns?: [boolean, boolean]
    btnTexts?: [StringOrUndefined, StringOrUndefined]
    align?: 'left' | 'center' | 'right'
    onSubmit?: Function
    onReset?: Function
    col?: Partial<ColProps>
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
        type: Array as PropType<ProFormItemType[]>,
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
