import { isObject, isString } from '@jc/element-plus-pro-utils'
import { isPresetCellType, isPresetCellTypeProps } from './table-cell.type'
import { cloneDeep } from 'lodash-es'
import type {
    PresetCellType,
    PresetCellTypeProps,
    CellConfig,
    CellRenderConfig
} from './table-cell.type'
import type { ProTableProps } from './table'
import type { OperationColumnConfig } from './operation-column/operation-column.type'

export function processColumnConfig(tableConfig: ProTableProps) {
    const tableColumns = cloneDeep(tableConfig.tableColumns)
    for (const item of tableColumns) {
        // 处理对齐方式
        if (item.align === undefined) {
            item.align = item.align || tableConfig.align || 'center'
        }

        item.cell = normalizePresetCell(item.cell)
    }

    return [tableConfig.tableColumns, tableColumns]
}

const presetCellTypeDefaultOptMap: {
    [key in PresetCellType]: () => PresetCellTypeProps
} = {
    txt: () => ({
        cellType: 'txt',
        formatValue: undefined,
        isCopy: false
    }),
    image: () => ({
        cellType: 'image',
        isCircle: true,
        width: 80,
        height: 80
    }),
    input: () =>
        ({
            cellType: 'input',
            placeholder: '请输入',
            size: 'default',
            disabled: false
        }) as PresetCellTypeProps,
    switch: () =>
        ({
            cellType: 'switch'
        }) as PresetCellTypeProps,
    progress: () =>
        ({
            cellType: 'progress'
        }) as PresetCellTypeProps,
    input_number: () =>
        ({
            cellType: 'input_number',
            min: 0,
            max: 100,
            step: 1,
            disabled: false,
            size: 'default'
        }) as PresetCellTypeProps,
    select: () =>
        ({
            cellType: 'select',
            options: [],
            multiple: false,
            size: 'default',
            disabled: false
        }) as PresetCellTypeProps,
    enum: () =>
        ({
            cellType: 'enum'
        }) as PresetCellTypeProps
}

/**
 * 归一化预设组件 cellType
 */
function normalizePresetCell(
    cell: CellConfig | undefined
): PresetCellTypeProps | CellRenderConfig | undefined {
    // 1. 如果cell是字符串类型，且这个字符串类型是预设类型字符串，就返回一个默认的预设配置
    if (isString(cell) && isPresetCellType(cell)) {
        const defaultOpt = presetCellTypeDefaultOptMap[cell]()
        return defaultOpt
    }

    // 2. 如果这个cell是一个对象
    if (isObject(cell)) {
        // 2.1 如果对象存在 cellType 属性，且 cell.cellType 的值是预设字符串类型
        if (isPresetCellTypeProps(cell)) {
            // 获取默认配置
            const defaultOpt = presetCellTypeDefaultOptMap[cell.cellType]()
            // 将用户传递的配置与默认配置合并
            return { ...defaultOpt, ...cell } as PresetCellTypeProps
        }

        // 2.2 如果对象没有 cellType 属性，但是传递了 render 等属性
        // 这种情况认为是自定义渲染配置
        if ('render' in cell || 'slot' in cell) {
            return cell as CellRenderConfig
        }
    }

    // 其余情况返回 undefined-使用el组件库的默认行为
    return undefined
}

/**
 * 生成操作列配置
 */
export function generateOperationColumnConfig(
    tableConfig: ProTableProps
): OperationColumnConfig | null {
    const config = tableConfig.operationColumn

    function getWidth(config: OperationColumnConfig | undefined): number {
        // 是对象则表示配置对象
        if (isObject(config)) {
            const hideBtns = [
                config?.btnConfig?.viewBtn,
                config?.btnConfig?.editBtn,
                config?.btnConfig?.deleteBtn
            ]

            // 如果按钮的值转化类型之后为真，则认为需要显示该按钮
            const btnCount = hideBtns.filter((item) => {
                // 如果是 undefined 也认为需要显示该按钮
                if (item === undefined) {
                    return true
                }
                return !!item
            }).length
            const isTextBtn =
                config?.btnConfig?.isTextBtn === undefined
                    ? true
                    : config?.btnConfig?.isTextBtn
            const baseWidth = isTextBtn ? 65 : 80
            return baseWidth * btnCount
        } else {
            // 非对象则直接返回默认值，默认只显示两个按钮
            const baseWidth = 65
            return baseWidth * 2
        }
    }

    const defaultConfig: OperationColumnConfig = {
        fixed: 'right',
        align: tableConfig.align || 'center',
        label: '操作',
        btnConfig: {
            isTextBtn: true,
            editBtn: true,
            deleteBtn: true,
            viewBtn: false,
            displayMode: 'icon-text'
        }
    }

    if (isObject(config)) {
        const totalConfig = {
            ...defaultConfig,
            ...config,
            width: 0,
            btnConfig: {
                ...defaultConfig.btnConfig,
                ...config.btnConfig
            }
        }
        totalConfig.width = getWidth(totalConfig)

        return totalConfig
    } else {
        // 如果不为 true 或者对象，则返回 null 表示不开启操作列
        return null
    }
}
