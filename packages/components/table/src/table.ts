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

export type RequestApiConfig =
    | {
          get: (params: Record<string, any>) => Promise<any>
          create?: (params: Record<string, any>) => Promise<any>
          update?: (params: Record<string, any>) => Promise<any>
          remove?: (params: Record<string, any>) => Promise<any>
      }
    | ((params: Record<string, any>) => Promise<any>)

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
        type: Object as PropType<RequestApiConfig>
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

// !参考
/*
export interface ProTableProps {
  columns: ColumnProps[]; // 列配置项  ==> 必传
  data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string; // 表格标题 ==> 非必传
  pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: ("refresh" | "setting" | "search")[] | boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

作者：HalseySpicy
链接：https://juejin.cn/post/7166068828202336263/
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
