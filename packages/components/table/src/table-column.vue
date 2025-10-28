<script setup lang="ts">
import { isArray, isString, omit } from '@coderjc/element-plus-pro-utils'
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
import { ElTableColumn } from 'element-plus'

defineOptions({
    name: 'TableColumn'
})

defineSlots<{
    [key: string]: (props: any) => any
}>()

const props = defineProps({
    column: {
        type: Object as PropType<ProTableColumnType>,
        required: true
    }
})

const getElTableColumnProps = (item: ProTableColumnType) => {
    const omitKeys = ['label', 'cell', 'hidden', 'isQuery', 'children']
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

const hasChildren = (item: ProTableColumnType) => {
    return isArray(item.children) && item.children.length
}
</script>

<template>
    <el-table-column
        v-if="!props.column.hidden"
        :label="getLabel(props.column.label)"
        v-bind="getElTableColumnProps(props.column)"
    >
        <template v-if="!isString(props.column.label)" #header>
            <slot
                v-if="props.column.label?.slot"
                :name="props.column.label.slot"
            ></slot>
            <Component v-else :is="props.column.label?.render" />
        </template>
        <!-- 如果有子列，递归渲染子列（嵌套表头） -->
        <template v-if="hasChildren(props.column)">
            <TableColumn
                v-for="(child, index) in props.column.children"
                :key="child.prop || index"
                :column="child"
            >
                <template v-for="(_, name) in $slots" #[name]="slotProps">
                    <slot :name="name" v-bind="slotProps"></slot>
                </template>
            </TableColumn>
        </template>
        <!-- 没有子列时，渲染单元格内容 -->
        <template v-if="!hasChildren(props.column)" #default="scoped">
            <Component
                v-if="isUsePresetCell(props.column.cell)"
                v-bind="omit(props.column, ['prop', 'cell'])"
                :is="getCellComp(props.column?.cell)"
                :scoped="scoped"
                :prop="props.column.prop"
                :cellOpt="props.column.cell"
            ></Component>
            <Component
                v-else-if="getCellRender(props.column.cell)"
                :is="() => getCellRender(props.column.cell)!(scoped.row)"
            />
            <div v-else-if="getCellSlot(props.column.cell)">
                <slot
                    :name="getCellSlot(props.column.cell)"
                    :row="scoped.row"
                ></slot>
            </div>
        </template>
    </el-table-column>
</template>
