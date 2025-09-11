import type {
    TagProps,
    ImageProps,
    InputProps,
    InputEmits,
    InputNumberProps,
    InputNumberEmits,
    ComponentSize
} from 'element-plus'
import type { Component } from 'vue'

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
    | 'dot_tag' // 类似这种表现形式（● 正常）
    | 'progress'

export const presetCellTypeKeys = [
    'txt',
    'tag',
    'image',
    'switch',
    'input',
    'input_number',
    'select',
    'dot_tag',
    'progress'
] as const
export const isPresetCellType = (type: any): type is PresetCellType =>
    presetCellTypeKeys.includes(type)

export const isPresetCellTypeProps = (
    props: any
): props is PresetCellTypeProps => {
    return (
        props &&
        typeof props === 'object' &&
        'cellType' in props &&
        isPresetCellType(props.cellType)
    )
}

// 文本单元格类型
export interface TxtCellTypeProps {
    cellType: 'txt'
    formatValue?: (value: any, raw: any) => string
    isCopy?: boolean // 开启后文本右侧会有一个复制图标
}

// 标签单元格类型
export interface TagCellTypeProps extends Partial<TagProps> {
    cellType: 'tag'
    size?: ComponentSize
}

// 图片单元格类型
export interface ImageCellTypeProps extends Partial<ImageProps> {
    cellType: 'image'
    width?: number
    height?: number
    isCircle?: boolean
}

// 输入框单元格类型
export interface InputCellTypeProps extends InputProps, InputEmits {
    cellType: 'input'
    size?: ComponentSize
}

// 计数器单元格类型
export interface InputNumberCellTypeProps
    extends InputNumberProps,
        InputNumberEmits {
    cellType: 'input_number'
    size?: ComponentSize
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
    size?: ComponentSize
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
    render?: (raw: any) => Component
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
