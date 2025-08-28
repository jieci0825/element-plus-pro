import type { ExtractPropTypes, VNode, Component, PropType } from 'vue'
import type { CellConfig } from './table-cell.type'
import type { ComponentSize } from 'element-plus'

export interface HeaderRenderConfig {
    /**
     * @description 渲染函数-优先级大于 slot 配置
     */
    render?: () => VNode | Component
    /**
     * @description 插槽名称
     */
    slot?: string
}

// 表头配置类型 - 支持字符串或渲染配置
export type HeaderConfig = string | HeaderRenderConfig

type BooleanOrUndefined = boolean | undefined
type StringOrUndefined = string | undefined
type ComponentOrUndefined = Component | undefined
// 操作列配置
//  - 所有的元组传递，如果只想改变其中一个，其他的想使用默认的可以传递 undefined
export interface OperationColumnConfig {
    size?: ComponentSize
    isFixed?: boolean
    // 是否以文本按钮的样式展示
    isTextBtn?: boolean
    // 是否需要icon
    isNeedIcon?: boolean
    // 按钮展示模式：icon-text:图标+文本；icon-only:图标；text-only:文本
    displayMode?: 'icon-text' | 'icon-only' | 'text-only'
    // 是否隐藏按钮-数组形式，分别对应查看、编辑、删除
    hideBtns?: [BooleanOrUndefined, BooleanOrUndefined, BooleanOrUndefined]
    disabledBtns?: [BooleanOrUndefined, BooleanOrUndefined, BooleanOrUndefined]
    cancelDefault?: [BooleanOrUndefined, BooleanOrUndefined, BooleanOrUndefined]
    btnTexts?: [StringOrUndefined, StringOrUndefined, StringOrUndefined]
    btnIcons?: [
        StringOrUndefined | ComponentOrUndefined,
        StringOrUndefined | ComponentOrUndefined,
        StringOrUndefined | ComponentOrUndefined
    ]
    editClick?: (row: any) => void
    viewClick?: (row: any) => void
    deleteClick?: (row: any) => void
    // 当你不想给每一个按钮都单独配置点击事件，希望统一配置点击事件时，可以传递这个，当存在单独click事件配置时，优先使用单独的
    handleClick?: (row: any, btnType: 'edit' | 'view' | 'delete') => void
}

export interface ProTableColumnType {
    /**
     * @description 列名-表头显示的名称
     */
    label?: HeaderConfig

    /**
     * @description 字段名-对应数据中的字段名
     */
    prop: string

    /**
     * @description 单元格配置-默认为 txt
     */
    cell?: CellConfig

    /**
     * @description 是否隐藏该列
     */
    hidden?: boolean

    // 其余与 ElTableColumn 相同的属性
}

export const proTableProps = {
    /**
     * @description 表格数据
     */
    tableData: {
        type: Array,
        default: () => []
    },

    /**
     * @description 表格列配置
     */
    tableColumns: {
        type: Array as PropType<ProTableColumnType[]>,
        default: () => []
    },

    /**
     * @description 是否启用操作列-即在表格末尾添加一列，用于存放操作按钮，如果需要配置，可以传递配置对象
     */
    enableOperationColumn: {
        type: [Boolean, Object] as PropType<OperationColumnConfig | Boolean>,
        default: true
    }
} as const

export type ProTable = ExtractPropTypes<typeof proTableProps>
