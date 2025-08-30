import { isObject, isString } from '@jc/element-plus-pro-utils'
import type { ProTableProps } from './table'
import { isPresetCellType, isPresetCellTypeProps } from './table-cell.type'
import type {
    PresetCellType,
    PresetCellTypeProps,
    CellConfig,
    CellRenderConfig
} from './table-cell.type'
import type { OperationColumnConfig } from './operateion-columb.type'
import { View, Delete, Edit } from '@element-plus/icons-vue'

export function processColumnConfig(tableConfig: ProTableProps) {
    for (const item of tableConfig.tableColumns) {
        // 处理对齐方式
        if (item.align === undefined) {
            item.align = item.align || tableConfig.align || 'center'
        }

        item.cell = normalizePresetCell(item.cell)
    }
}

const presetCellTypeDefaultOptMap: {
    [key in PresetCellType]: () => PresetCellTypeProps
} = {
    txt: () => ({
        cellType: 'txt',
        formatValue: undefined,
        isCopy: false
    }),
    dot_tag: () => ({}) as PresetCellTypeProps,
    image: () => ({
        cellType: 'image',
        isCircle: true
    }),
    input: () => ({}) as PresetCellTypeProps,
    switch: () => ({}) as PresetCellTypeProps,
    progress: () => ({}) as PresetCellTypeProps,
    input_number: () => ({}) as PresetCellTypeProps,
    tag: () => ({
        cellType: 'tag',
        size: 'small'
    }),
    select: () => ({}) as PresetCellTypeProps
}

/**
 * 归一化预设组件 cellType
 */
function normalizePresetCell(
    cell: CellConfig | undefined
): PresetCellTypeProps | CellRenderConfig {
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

        // 2.2 如果对象没有 cellType 属性，但是传递了 formatValue、render 等属性
        // 这种情况认为是自定义渲染配置
        if ('formatValue' in cell || 'render' in cell || 'slot' in cell) {
            return cell as CellRenderConfig
        }
    }

    // 3. 如果都不是，则作为文本处理
    return presetCellTypeDefaultOptMap.txt()
}

/**
 * 生成操作列配置
 */
export function generateOperationColumnConfig(
    tableConfig: ProTableProps
): OperationColumnConfig | null {
    const config = tableConfig.operationColumn

    if (!config === undefined || config === null) {
        return null
    }

    const defaultConfig: OperationColumnConfig = {
        isFixed: true,
        align: config.align || tableConfig.align || 'center',
        label: '操作',
        width: 120,
        btnProps: {
            size: 'default',
            isTextBtn: true,
            isNeedIcon: true,
            displayMode: 'icon-text',
            hideBtns: [true, false, false],
            disabledBtns: [false, false, false],
            cancelDefault: [false, false, false],
            btnTexts: ['查看', '编辑', '删除'],
            btnIcons: [View, Edit, Delete],
            editClick: undefined,
            deleteClick: undefined,
            viewClick: undefined,
            handleClick: undefined
        }
    }

    if (config === null) {
        return defaultConfig
    }

    if (config.btnProps) {
        config.btnProps = {
            ...defaultConfig.btnProps,
            ...config.btnProps
        }
    }

    return { ...defaultConfig, ...config }
}
