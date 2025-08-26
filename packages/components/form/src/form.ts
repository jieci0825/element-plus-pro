import { UPDATE_MODEL_EVENT } from '@jc/element-plus-pro-constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type { DatePickType } from 'element-plus'

export type MyFormItemType =
    | 'input'
    | 'password'
    | 'input_number'
    | 'textarea'
    | 'select'
    | 'group_select'
    | 'radio'
    | 'radio_button'
    | 'checkbox'
    | 'checkbox_button'
    | 'switch'
    | 'upload'
    | 'cascader'
    | 'color'

export type ProFormItemTypeKeys = MyFormItemType | DatePickType

export interface ProFormItemType {
    /**
     * @description 表单名称
     */
    label: string

    /**
     * @description 表单key
     */
    key: string

    /**
     * @description 表单项类型
     */
    type?: ProFormItemTypeKeys

    /**
     * @description 隐藏表单项
     */
    hidden?: boolean

    /**
     * @description 传递给原 ElementPlus 表单项的插槽
     */
    elSlots?: Record<string, Function | string>

    /**
     * @description 启用自定义插槽，插槽名默认取用当前表单项的 key，则不会渲染默认的表单项，需要自行实现表单项
     */
    customSlot?: boolean

    /**
     * @description 表单项所占栅格数-优先级高于form的span
     */
    span?: number

    /**
     * @description 传递给原 ElementPlus 表单项的属性
     */
    props?: Record<string, any>

    /**
     * @description 允许添加任意其他属性
     */
    [key: string]: any
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
    span: {
        type: Number as PropType<number>,
        default: 24
    }

    // 其他属性则会直接透传给 el-form
} as const

export type ProFormProps = ExtractPropTypes<typeof proFormProps>

export const proFormEmits = {
    [UPDATE_MODEL_EVENT]: (value: any) => true
}
export type ProFormEmits = typeof proFormEmits
