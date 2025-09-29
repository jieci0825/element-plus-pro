import type {
    DatePickType,
    FormItemProps,
    InputProps,
    InputNumberProps,
    TimePickerDefaultPropsPublic,
    SelectProps,
    CheckboxGroupProps,
    SwitchProps,
    CascaderInstance,
    ColorPickerProps,
    RadioGroupProps,
    ColProps
} from 'element-plus'
import type { Component } from 'vue'

interface OptionItem {
    label: string | number
    value: string | number
    disabled?: boolean
    [key: string]: any
}

interface OptionGroupItem {
    label: string | number
    options: OptionItem[]
    [key: string]: any
}

type OptionType = OptionItem[] | OptionGroupItem[]

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

export type MyFormItemPropsByInput = {
    type?: 'input'
    props?: Partial<
        Omit<InputProps, 'modelValue' | 'rows' | 'autosize' | 'show-password'>
    >
}
export type MyFormItemPropsByInputWithTopLevel = {
    type?: 'input'
} & MyFormItemPropsByInput &
    Partial<
        Omit<InputProps, 'modelValue' | 'rows' | 'autosize' | 'show-password'>
    >

export type MyFormItemPropsByPassword = {
    type?: 'password'
    props?: Partial<
        Omit<InputProps, 'modelValue' | 'rows' | 'autosize' | 'parser'>
    >
}
export type MyFormItemPropsByPasswordWithTopLevel = {
    type?: 'password'
} & MyFormItemPropsByPassword &
    Partial<Omit<InputProps, 'modelValue' | 'rows' | 'autosize' | 'parser'>>

export type MyFormItemPropsByInputNumber = {
    type?: 'input_number'
    props?: Partial<Omit<InputNumberProps, 'modelValue'>>
}
export type MyFormItemPropsByInputNumberWithTopLevel = {
    type?: 'input_number'
} & MyFormItemPropsByInputNumber &
    Partial<Omit<InputNumberProps, 'modelValue'>>

export type MyFormItemPropsByTextarea = {
    type?: 'textarea'
    props?: Partial<
        Omit<
            InputProps,
            'modelValue' | 'clearable' | 'parser' | 'size' | 'show-password'
        >
    >
}
export type MyFormItemPropsByTextareaWithTopLevel = {
    type?: 'textarea'
} & MyFormItemPropsByTextarea &
    Partial<
        Omit<
            InputProps,
            'modelValue' | 'clearable' | 'parser' | 'size' | 'show-password'
        >
    >

export type MyFormItemPropsBySelect = {
    type?: 'select'
    options: OptionType
    props?: Partial<Omit<SelectProps, 'modelValue'>>
}
export type MyFormItemPropsBySelectWithTopLevel = {
    type?: 'select'
} & MyFormItemPropsBySelect &
    Partial<Omit<SelectProps, 'modelValue'>>

export type MyFormItemPropsByGroupSelect = {
    type?: 'group_select'
    options: OptionType
    props?: Partial<Omit<SelectProps, 'modelValue'>>
}
export type MyFormItemPropsByGroupSelectWithTopLevel = {
    type?: 'group_select'
} & MyFormItemPropsByGroupSelect &
    Partial<Omit<SelectProps, 'modelValue'>>

export type MyFormItemPropsByRadio = {
    type?: 'radio'
    options: OptionType
    props?: Partial<Omit<RadioGroupProps, 'modelValue'>>
}
export type MyFormItemPropsByRadioWithTopLevel = {
    type?: 'radio'
} & MyFormItemPropsByRadio &
    Partial<Omit<RadioGroupProps, 'modelValue'>>

export type MyFormItemPropsByRadioButton = {
    type?: 'radio_button'
    options: OptionType
    props?: Partial<Omit<RadioGroupProps, 'modelValue'>>
}
export type MyFormItemPropsByRadioButtonWithTopLevel = {
    type?: 'radio_button'
} & MyFormItemPropsByRadioButton &
    Partial<Omit<RadioGroupProps, 'modelValue'>>

export type MyFormItemPropsByCheckbox = {
    type?: 'checkbox'
    options: OptionType
    props?: Partial<Omit<CheckboxGroupProps, 'modelValue'>>
}
export type MyFormItemPropsByCheckboxWithTopLevel = {
    type?: 'checkbox'
} & MyFormItemPropsByCheckbox &
    Partial<Omit<CheckboxGroupProps, 'modelValue'>>

export type MyFormItemPropsByCheckboxButton = {
    type?: 'checkbox_button'
    options: OptionType
    props?: Partial<Omit<CheckboxGroupProps, 'modelValue'>>
}
export type MyFormItemPropsByCheckboxButtonWithTopLevel = {
    type?: 'checkbox_button'
} & MyFormItemPropsByCheckboxButton &
    Partial<Omit<CheckboxGroupProps, 'modelValue'>>

export type MyFormItemPropsBySwitch = {
    type?: 'switch'
    props?: Partial<Omit<SwitchProps, 'modelValue'>>
}
export type MyFormItemPropsBySwitchWithTopLevel = {
    type?: 'switch'
} & MyFormItemPropsBySwitch &
    Partial<Omit<SwitchProps, 'modelValue'>>

export type MyFormItemUploadMode = 'drag' | 'thumb'
export type MyFormItemPropsByUpload = {
    type?: 'upload'
    props?: any
    mode: MyFormItemUploadMode
    accept?: string
    // 文件大小限制
    size?: number
    // 文件数量限制
    limit?: number
    multiple?: boolean
    // 文件选取之后数量超出的回调
    onExceed?: (currentFiles: File[], files: File[]) => void
    // 提示文本，在 drag 模式下生效
    tip?: string
}
export type MyFormItemPropsByUploadWithTopLevel = {
    type?: 'upload'
} & MyFormItemPropsByUpload

export type MyFormItemPropsByCascader = {
    type?: 'cascader'
    props?: Partial<Omit<CascaderInstance['$props'], 'modelValue'>>
}
export type MyFormItemPropsByCascaderWithTopLevel = {
    type?: 'cascader'
} & MyFormItemPropsByCascader &
    Partial<Omit<CascaderInstance['$props'], 'modelValue'>>

export type MyFormItemPropsByColor = {
    type?: 'color'
    props?: Partial<Omit<ColorPickerProps, 'modelValue'>>
}
export type MyFormItemPropsByColorWithTopLevel = {
    type?: 'color'
} & MyFormItemPropsByColor &
    Partial<Omit<ColorPickerProps, 'modelValue'>>

export type MyFormItemPropsByDatePickType = {
    type?: DatePickType
    props?: Partial<Omit<TimePickerDefaultPropsPublic, 'modelValue'>>
}
export type MyFormItemPropsByDatePickTypeWithTopLevel = {
    type?: DatePickType
} & MyFormItemPropsByDatePickType &
    Partial<Omit<TimePickerDefaultPropsPublic, 'modelValue'>>

export type MyFormItemPropsByTypes =
    | MyFormItemPropsByInputWithTopLevel
    | MyFormItemPropsByPasswordWithTopLevel
    | MyFormItemPropsByInputNumberWithTopLevel
    | MyFormItemPropsByTextareaWithTopLevel
    | MyFormItemPropsBySelectWithTopLevel
    | MyFormItemPropsByGroupSelectWithTopLevel
    | MyFormItemPropsByRadioWithTopLevel
    | MyFormItemPropsByRadioButtonWithTopLevel
    | MyFormItemPropsByCheckboxWithTopLevel
    | MyFormItemPropsByCheckboxButtonWithTopLevel
    | MyFormItemPropsBySwitchWithTopLevel
    | MyFormItemPropsByUploadWithTopLevel
    | MyFormItemPropsByCascaderWithTopLevel
    | MyFormItemPropsByColorWithTopLevel
    | MyFormItemPropsByDatePickTypeWithTopLevel

export type ProFormItemTypeKeys = MyFormItemType | DatePickType

export interface ProFormItemCommonType
    extends Partial<Omit<FormItemProps, 'label' | 'prop'>> {
    /**
     * @description 表单名称
     */
    label: string | Component

    /**
     * @description 表单key
     */
    key: string

    /**
     * @description 隐藏label
     */
    hideLabel?: boolean

    /**
     * @description 提示信息-仅label为文本时有效
     */
    tooltip?: string

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
    col?: Partial<ColProps>
}

export type ProFormItemType = ProFormItemCommonType & MyFormItemPropsByTypes
