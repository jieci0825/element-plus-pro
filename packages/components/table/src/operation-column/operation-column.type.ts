import type { ButtonType, TableColumnInstance } from 'element-plus'
import type { HeaderConfig } from '../common.type'
import { Component } from 'vue'

// 按钮展示模式：icon-text:图标+文本；icon-only:图标；text-only:文本
export type DisplayMode = 'icon-text' | 'icon-only' | 'text-only'

export interface BtnConfig {
    text?: string
    onClick?: Function
    icon?: string | Component // 仅支持element-plus图标
    disabled?: boolean
    type?: Omit<ButtonType, 'text'>
    plain?: boolean // 是否朴素按钮，仅不使用文本按钮时生效
}
export interface OperationColumnConfigBtnOption {
    // 是否以文本按钮的样式展示
    isTextBtn: boolean
    // 按钮展示模式
    displayMode: DisplayMode
    editBtn: BtnConfig | boolean
    viewBtn: BtnConfig | boolean
    deleteBtn: BtnConfig | boolean
    plain: boolean // 专属于 el-button
}
// 操作列配置
//  - 所有的元组传递，如果只想改变其中一个，其他的想使用默认的可以传递 undefined
export interface OperationColumnConfig
    extends Partial<Pick<TableColumnInstance, 'width' | 'minWidth' | 'align'>> {
    fixed?: 'left' | 'right' | null
    label?: HeaderConfig
    btnConfig?: Partial<OperationColumnConfigBtnOption>
}
