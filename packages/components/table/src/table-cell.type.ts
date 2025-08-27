import type {
    TagProps,
    ImageProps,
    InputProps,
    InputEmits,
    InputNumberProps,
    InputNumberEmits
} from 'element-plus'
import type { Component, VNode } from 'vue'

type SizeType = 'large' | 'default' | 'small'

/**
 * @description 预设单元格类型
 */
export type PresetCellType =
    | 'txt'
    | 'tag'
    | 'image'
    | 'switch'
    | 'btns'
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

// 按钮单元格类型-编辑、查看、删除
export interface BtnsCellTypeProps {
    cellType: 'btns'
    // 是否以文本按钮的样式展示
    isTextBtn?: boolean
    // 是否需要icon
    isNeedIcon?: boolean
    // 按钮展示模式：icon-text:图标+文本；icon-only:图标；text-only:文本
    displayMode?: 'icon-text' | 'icon-only' | 'text-only'
    hideEdit?: boolean
    hideView?: boolean
    hideDelete?: boolean
    disabledEdit?: boolean
    disabledView?: boolean
    disabledDelete?: boolean
    size?: SizeType
    onClick?: (row: any, column: any) => void
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
    | BtnsCellTypeProps
    | InputCellTypeProps

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
