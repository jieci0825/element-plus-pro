import type { ExtractPropTypes, Component, PropType } from 'vue'
import type { CellConfig } from './table-cell.type'
import type { OperationColumnConfig } from './operateion-columb.type'
import type {
    PaginationEmits,
    PaginationProps,
    TableColumnInstance
} from 'element-plus'
import type { ProFormProps } from 'packages/element-plus-pro'
import type {
    ComponentOrUndefined,
    HeaderConfig,
    StringOrUndefined
} from './common.type'

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
     * @description 单元格配置-默认为 txt
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

    [key: string]: any

    // 其余与 ElTableColumn 相同的属性
}

export type PaginationConfig = PaginationProps & PaginationEmits

export type SearchConfig = Omit<ProFormProps, 'modelValue'> & {
    beforeSearch?: (data: Record<string, any>) => void
    afterSearch?: (data: Record<string, any>) => void
    beforeReset?: (data: Record<string, any>) => void
    afterReset?: (data: Record<string, any>) => void
    // 重置、搜索
    hideBtns?: [boolean, boolean]
    btnTexts?: [StringOrUndefined, StringOrUndefined]
    btnIcons?: [
        StringOrUndefined | ComponentOrUndefined,
        StringOrUndefined | ComponentOrUndefined
    ]
}

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
    del?: (params: Record<string, any>) => Promise<any>
    edit?: (params: Record<string, any>) => Promise<any>
    add?: (params: Record<string, any>) => Promise<any>
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
     * @description 搜索表单数据
     */
    searchFormData: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
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
        type: [null, Object] as PropType<OperationColumnConfig | null>,
        default: () => ({})
    },

    /**
     * @description 分页配置
     */
    paginationConfig: {
        type: [null, Object] as PropType<PaginationConfig | null>,
        default: () => ({})
    },

    /**
     * @description 搜索配置
     */
    serachConfig: {
        type: [null, Object] as PropType<SearchConfig | null>,
        default: () => ({})
    },

    /**
     * @description 表头工具栏配置
     */
    headerToolbarConfig: {
        type: [null, Object] as PropType<HeaderToolbarConfig | null>,
        default: () => ({})
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
        default: () => ({})
    }
} as const

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
