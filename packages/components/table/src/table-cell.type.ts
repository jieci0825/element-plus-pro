import type {
    TagProps,
    ImageProps,
    InputProps,
    InputEmits,
    InputNumberProps,
    InputNumberEmits
} from 'element-plus'
import type { Component, VNode } from 'vue'

export type SizeType = 'large' | 'default' | 'small'

/**
 * @description 预设单元格类型
 */
export type PresetCellType =
    | 'txt'
    | 'tag'
    | 'image'
    | 'switch'
    | 'input'
    | 'input_number'
    | 'select'

// 文本单元格类型
export interface TxtCellTypeProps {
    cellType: 'txt'
    formatValue?: (value: any) => string
}

// 标签单元格类型
export interface TagCellTypeProps extends TagProps {
    cellType: 'tag'
    size?: SizeType
}

// 图片单元格类型
export interface ImageCellTypeProps extends ImageProps {
    cellType: 'image'
    width?: number
    height?: number
    isCircle?: boolean
}

// 输入框单元格类型
export interface InputCellTypeProps extends InputProps, InputEmits {
    cellType: 'input'
    size?: SizeType
}

// 计数器单元格类型
export interface InputNumberCellTypeProps
    extends InputNumberProps,
        InputNumberEmits {
    cellType: 'input_number'
    size?: SizeType
}

type SelectCellOptions = {
    label: string
    value: any
    disabled?: boolean
}
// 下拉选择单元格类型-这是一个复杂的组件，所以并不全民支持原 Elementplus 的 Select 组件配置，仅做了一些简单的配置
export interface SelectCellTypeProps {
    cellType: 'select'
    options: SelectCellOptions[]
    multiple?: boolean
    size?: SizeType
    onChange?: (value: any) => void
}

// 预设单元格类型为配置对象是的属性
export type PresetCellTypeProps =
    | TxtCellTypeProps
    | TagCellTypeProps
    | ImageCellTypeProps
    | InputCellTypeProps
    | InputNumberCellTypeProps
    | SelectCellTypeProps

export interface CellRenderConfig {
    /**
     * @description 渲染函数-优先级大于 slot 配置
     */
    render?: () => VNode | Component
    /**
     * @description 插槽名称
     */
    slot?: string
    /**
     * @description 格式化函数-在 txt 的类型下，你对要展示的值进行格式化时使用
     */
    formatValue?: (value: any) => string
}

export type CellConfig = PresetCellType | CellRenderConfig | PresetCellTypeProps
