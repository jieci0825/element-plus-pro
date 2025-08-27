import type { ExtractPropTypes, VNode, Component } from 'vue'

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

/**
 * @description 表头配置类型 - 支持字符串或渲染配置
 */
export type HeaderConfig = string | HeaderRenderConfig

export interface ProTableColumnType {
    /**
     * @description 列名-表头显示的名称
     */
    label: HeaderConfig

    /**
     * @description 字段名-对应数据中的字段名
     */
    prop: string
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
        type: Array,
        default: () => []
    }
} as const

export type ProTable = ExtractPropTypes<typeof proTableProps>
