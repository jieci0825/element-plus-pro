import type { ComponentSize, ProgressProps, TagProps } from 'element-plus'
import type { Component } from 'vue'

/**
 * @description 预设单元格类型
 */
export type PresetCellType =
    | 'txt'
    | 'image'
    | 'switch'
    | 'input'
    | 'input_number'
    | 'select'
    | 'progress'
    | 'enum'

export const presetCellTypeKeys = [
    'txt',
    'image',
    'switch',
    'input',
    'input_number',
    'select',
    'progress',
    'enum'
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
    formatValue?: (value: any, row: any) => string
    isCopy?: boolean // 开启后文本右侧会有一个复制图标
}

// 图片单元格类型
export interface ImageCellTypeProps {
    cellType: 'image'
    width?: number
    height?: number
    isCircle?: boolean
    errorSlot?: Component
}

// 开关单元格类型
export interface SwitchCellTypeProps {
    cellType: 'switch'
    size?: ComponentSize
    inactiveColor?: string
    activeColor?: string
    activeText?: string
    inactiveText?: string
}

// 输入框单元格类型
export interface InputCellTypeProps {
    cellType: 'input'
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
}

// 计数器单元格类型
export interface InputNumberCellTypeProps {
    cellType: 'input_number'
    size?: ComponentSize
    min: number
    max: number
    step: number
    disabled?: boolean
}

type SelectCellOptions = {
    label: string
    value: any
    disabled?: boolean
}

// 下拉选择单元格类型
export interface SelectCellTypeProps {
    cellType: 'select'
    options: SelectCellOptions[]
    multiple?: boolean
    size?: ComponentSize
    disabled?: boolean
}

// 进度条单元格类型
export interface ProgressCellTypeProps
    extends Partial<Omit<ProgressProps, 'percentage'>> {
    cellType: 'progress'
}

// 枚举默认是以tag的方式展示
interface ValueEnumInTag extends Partial<Omit<TagProps, 'closable'>> {
    text: string | number
}
export interface ValueEnum {
    [key: string]: string | number | ValueEnumInTag
}
// 枚举单元格类型
export interface EnumCellTypeProps {
    cellType: 'enum'
    valueEnum: ValueEnum
    // 如果传递了 render，则会优先使用 render 渲染，而非 el-tag
    render?: (row: any) => Component
}

// 预设单元格类型为配置对象是的属性
export type PresetCellTypeProps =
    | TxtCellTypeProps
    | ImageCellTypeProps
    | SwitchCellTypeProps
    | InputCellTypeProps
    | InputNumberCellTypeProps
    | SelectCellTypeProps
    | ProgressCellTypeProps
    | EnumCellTypeProps

export interface CellRenderConfig {
    /**
     * @description 渲染函数-优先级大于 slot 配置
     */
    render?: (row: any) => Component
    /**
     * @description 插槽名称
     */
    slot?: string
}

export type CellConfig = PresetCellType | CellRenderConfig | PresetCellTypeProps
