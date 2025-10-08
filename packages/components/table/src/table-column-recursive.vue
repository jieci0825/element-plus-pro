<script setup lang="ts">
import { isString, omit } from '@jc/element-plus-pro-utils'
import {
    CellConfig,
    CellRenderConfig,
    isPresetCellTypeProps,
    PresetCellType
} from './table-cell.type'
import {
    TxtCell,
    ImageCell,
    SwitchCell,
    InputCell,
    InputNumberCell,
    SelectCell,
    ProgressCell,
    EnumCell
} from './table-cell'
import type { PropType, Component } from 'vue'
import type { ProTableColumnType } from './table'

defineOptions({
    name: 'TableColumnRecursive'
})

const props = defineProps({
    tableColumns: {
        type: Array as PropType<ProTableColumnType[]>,
        default: () => []
    }
})

const getElTableColumnProps = (item: ProTableColumnType) => {
    const omitKeys = ['label', 'cell', 'hidden', 'isQuery']
    const defaultProps = {
        showOverflowTooltip: true
    }
    return { ...defaultProps, ...omit(item, omitKeys) }
}

const cellCompMap: { [key in PresetCellType]: Component } = {
    txt: TxtCell,
    image: ImageCell,
    input: InputCell,
    switch: SwitchCell,
    progress: ProgressCell,
    input_number: InputNumberCell,
    select: SelectCell,
    enum: EnumCell
}

const getCellComp = (cell: CellConfig | undefined) => {
    if (isPresetCellTypeProps(cell)) {
        return cellCompMap[cell.cellType]
    }
    return undefined
}

const isUsePresetCell = (cell: any) => {
    return isPresetCellTypeProps(cell)
}

/**
 * 类型守卫：判断是否为 CellRenderConfig 类型
 */
const isCellRenderConfig = (
    cell: CellConfig | undefined
): cell is CellRenderConfig => {
    return (
        cell !== undefined &&
        typeof cell === 'object' &&
        !isPresetCellTypeProps(cell) &&
        ('render' in cell || 'slot' in cell)
    )
}

/**
 * 获取 cell 的 render 函数（类型安全）
 */
const getCellRender = (cell: CellConfig | undefined) => {
    return isCellRenderConfig(cell) ? cell.render : undefined
}

/**
 * 获取 cell 的 slot 名称（类型安全）
 */
const getCellSlot = (cell: CellConfig | undefined) => {
    return isCellRenderConfig(cell) ? cell.slot : undefined
}

const getLabel = (label: any) => {
    return isString(label) ? label : undefined
}
</script>

<template>
    <template v-for="item in props.tableColumns" :key="item.prop">
        <el-table-column
            v-if="!item.hidden"
            :label="getLabel(item.label)"
            v-bind="getElTableColumnProps(item)"
        >
            <template v-if="!isString(item.label)" #header>
                <slot v-if="item.label?.slot" :name="item.label.slot"></slot>
                <Component v-else :is="item.label?.render" />
            </template>
            <!-- 没有则不使用插槽处理单元格渲染-遵循ep的默认行为 -->
            <template v-if="item.cell" #default="scoped">
                <Component
                    v-if="isUsePresetCell(item.cell)"
                    v-bind="omit(item, ['prop', 'cell'])"
                    :is="getCellComp(item?.cell)"
                    :scoped="scoped"
                    :prop="item.prop"
                    :cellOpt="item.cell"
                ></Component>
                <Component
                    v-else-if="getCellRender(item.cell)"
                    :is="() => getCellRender(item.cell)!(scoped.row)"
                />
                <div v-else-if="getCellSlot(item.cell)">
                    <slot
                        :name="getCellSlot(item.cell)"
                        :row="scoped.row"
                    ></slot>
                </div>
            </template>
        </el-table-column>
    </template>
</template>
