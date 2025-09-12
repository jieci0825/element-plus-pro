import type { ComponentSize } from 'element-plus'
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
    | 'dot_tag' // 类似这种表现形式（● 正常）
    | 'progress'

export const presetCellTypeKeys = [
    'txt',
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
}

type SelectCellOptions = {
    label: string
    value: any
    disabled?: boolean
}

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
    | ImageCellTypeProps
    | SwitchCellTypeProps
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
