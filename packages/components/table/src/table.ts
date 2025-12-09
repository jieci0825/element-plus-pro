import type { ExtractPropTypes, PropType } from 'vue'
import type { CellConfig } from './table-cell.type'
import type { OperationColumnConfig } from './operation-column/operation-column.type'
import type { TableColumnInstance, TableInstance } from 'element-plus'
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
    prop?: string

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
     * @description 子列
     */
    children?: ProTableColumnType[]

    /**
     * @description 枚举值
     */

    [key: string]: any

    // 其余与 ElTableColumn 相同的属性
}

export type Request = Function

export type RequestApiConfig = (params: Record<string, any>) => Promise<any>

export const proTableProps = {
    /**
     * @description 表格数据
     */
    data: {
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
     * @description 操作列-即在表格末尾添加一列，用于存放操作按钮，如果需要配置，可以传递配置对象
     */
    operationColumn: {
        type: [Object, null] as PropType<OperationColumnConfig | null>,
        default: null
    },

    /**
     * @description 对齐方式
     */
    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'center'
    },

    /**
     * @description 请求表格数据的 api
     */
    requestApi: {
        type: Function as PropType<(params: any) => Promise<any>>
    },

    /**
     * @description 是否自动执行请求 api
     */
    requestAuto: {
        type: Boolean,
        default: true
    },

    /**
     * @description 表格 api 请求错误监听
     */
    requestError: {
        type: Function as PropType<(params: any) => void>
    },

    /**
     * @description 返回数据的回调函数，可以对数据进行处理
     */
    dataCallback: {
        type: Function as PropType<(data: any) => any>
    },

    /**
     * @description 组件风格
     */
    componentStyle: {
        type: String as PropType<'' | 'card'>,
        default: 'card'
    },

    /**
     * @description 是否需要分页
     */
    pagination: {
        type: Boolean,
        default: true
    },

    /**
     * @description 表格标题
     */
    title: {
        type: String,
        default: ''
    },

    /**
     * @description 是否显示 Header 部分
     */
    showHeader: {
        type: Boolean,
        default: true
    },

    /**
     * @description 功能按钮
     */
    toolButton: {
        type: [Array, Boolean] as PropType<
            ('refresh' | 'setting' | 'search')[] | boolean
        >,
        default: () => ['refresh', 'setting', 'search']
    },

    /**
     * @description 查询初始参数
     */
    initParams: {
        type: Object,
        default: () => ({})
    },

    /**
     * @description 是否开启多选
     */
    selection: {
        type: Boolean,
        default: false
    },

    /**
     * @description 是否显示加载状态，默认开启（在有 requestApi 时自动控制）
     */
    loading: {
        type: Boolean,
        default: true
    },

    /**
     * @description 初始页码
     */
    page: {
        type: Number,
        default: 1
    },

    /**
     * @description 初始每页显示条数
     */
    pageSize: {
        type: Number,
        default: 10
    },

    /**
     * @description 每页显示个数选择器的选项设置
     */
    pageSizes: {
        type: Array as PropType<number[]>,
        default: () => [10, 25, 50, 100]
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

/**
 * @description ProTable 组件实例暴露的方法
 */
export interface ProTableInstance extends TableInstance {
    props: ProTableProps
    emit: ProTableEmits
    /**
     * @description 刷新表格数据（重新请求接口）
     */
    refresh: () => Promise<void>
}
