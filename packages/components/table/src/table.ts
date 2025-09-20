import type { ExtractPropTypes, Component, PropType } from 'vue'
import type { CellConfig } from './table-cell.type'
import type { OperationColumnConfig } from './operation-column/operation-column.type'
import type { TableColumnInstance } from 'element-plus'
import type { HeaderConfig } from './common.type'
import type { SearchType } from './search'

export interface ProTableColumnType
    extends Omit<TableColumnInstance['$props'], 'label' | 'prop'> {
    /**
     * @description 列名-表头显示的名称
     */
    label?: HeaderConfig

    /**
     * @description 字段名-对应数据中的字段名
     */
    prop: string

    /**
     * @description 单元格配置-不传递默认为 EP 的默认行为
     */
    cell?: CellConfig

    /**
     * @description 是否隐藏该列
     */
    hidden?: boolean

    /**
     * @description 对齐方式
     */
    align?: 'left' | 'center' | 'right'

    /**
     * @description 搜索配置
     */
    search?: SearchType

    /**
     * @description 枚举值
     */

    [key: string]: any

    // 其余与 ElTableColumn 相同的属性
}

export type Request = Function

export type HeaderToolbarConfig = {
    // 新增、删除所选
    hideLeftBtns?: [boolean, boolean]
    // 刷新、列配置、搜索
    hideRightBtns?: [boolean, boolean, boolean]
    leftSlot: string | Component
    rightSlot: string | Component
}

export type RequestApiConfig = {
    get: (params: Record<string, any>) => Promise<any>
    create?: (params: Record<string, any>) => Promise<any>
    update?: (params: Record<string, any>) => Promise<any>
    remove?: (params: Record<string, any>) => Promise<any>
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
     * @description 总数
     */
    total: {
        type: Number,
        default: 0
    },

    /**
     * @description 表格列配置
     */
    tableColumns: {
        type: Array as PropType<ProTableColumnType[]>,
        default: () => []
    },

    /**
     * @description 操作列-即在表格末尾添加一列，用于存放操作按钮，如果需要配置，可以传递配置对象
     */
    operationColumn: {
        type: Object as PropType<OperationColumnConfig>
    },

    /**
     * @description 表头工具栏配置
     */
    headerToolbarConfig: {
        type: Object as PropType<HeaderToolbarConfig>
    },

    /**
     * @description 对齐方式
     */
    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'center'
    },

    /**
     * @description 请求接口配置
     */
    requestApiConfig: {
        type: Object as PropType<RequestApiConfig>,
        required: true
    },

    /**
     * @description 组件风格
     */
    componentStyle: {
        type: String as PropType<'' | 'card'>,
        default: ''
    }
} as const

export type ProTableProps = ExtractPropTypes<typeof proTableProps>

export const proTableEmits = {
    cellChange: (
        row: Record<string, any>,
        column: ProTableColumnType,
        newValue: any
    ) => true
}
export type ProTableEmits = typeof proTableEmits

export interface ProTableContext {
    tableColumns: ProTableColumnType[]
    cellChange: (
        row: Record<string, any>,
        prop: string | number,
        newValue: any
    ) => void
}
