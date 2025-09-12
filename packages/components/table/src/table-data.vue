<script setup lang="ts">
import OperationColumn from './operation-column/operation-column.vue'
import { isString, omit } from '@jc/element-plus-pro-utils'
import { computed, useAttrs } from 'vue'
import {
    CellConfig,
    isPresetCellTypeProps,
    PresetCellType
} from './table-cell.type'
import {
    TxtCell,
    ImageCell,
    SwitchCell,
    InputCell,
    InputNumberCell
} from './table-cell'
import type { ProTableColumnType } from './table'
import type { PropType, Component } from 'vue'
import type { OperationColumnConfig } from './operation-column/operation-column.type'

const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    },
    tableColumns: {
        type: Array as PropType<ProTableColumnType[]>,
        default: () => []
    },
    operationColumnConfig: {
        type: [null, Object] as PropType<OperationColumnConfig | null>,
        default: null
    }
})

const attrs = useAttrs()

// 处理 el-table 的 props 属性
const elTableProps = computed(() => {
    return omit(attrs, ['data'])
})

const cellCompMap: { [key in PresetCellType]: Component } = {
    txt: TxtCell,
    dot_tag: TxtCell,
    image: ImageCell,
    input: InputCell,
    switch: SwitchCell,
    progress: TxtCell,
    input_number: InputNumberCell,
    select: TxtCell
}

const getElTableColumnProps = (item: ProTableColumnType) => {
    const omitKeys = ['label', 'cell', 'hidden']
    const defaultProps = {
        showOverflowTooltip: true
    }
    return { ...defaultProps, ...omit(item, omitKeys) }
}

const getCellComp = (cell: CellConfig | undefined) => {
    if (isPresetCellTypeProps(cell)) {
        return cellCompMap[cell.cellType]
    }
    // TODO
    return undefined
}

const getLabel = (label: any) => {
    return isString(label) ? label : undefined
}
</script>

<template>
    <el-table :data="props.tableData" v-bind="elTableProps">
        <el-table-column
            v-bind="getElTableColumnProps(item)"
            v-for="item in props.tableColumns"
            :key="item.prop"
            :label="getLabel(item.label)"
        >
            <template v-if="!isString(item.label)" #header>
                <slot v-if="item.label?.slot" :name="item.label.slot"></slot>
                <Component v-else :is="item.label?.render" />
            </template>
            <!-- 没有则不使用插槽处理单元格渲染-遵循ep的默认行为 -->
            <template v-if="item.cell" #default="scoped">
                <Component
                    v-bind="omit(item, ['prop', 'cell'])"
                    :is="getCellComp(item?.cell)"
                    :scoped="scoped"
                    :prop="item.prop"
                    :cellOpt="item.cell"
                ></Component>
            </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column
            v-if="props.operationColumnConfig"
            v-bind="omit(props.operationColumnConfig, ['label', 'btnProps'])"
            :label="getLabel(props.operationColumnConfig.label)"
        >
            <template
                v-if="!isString(props.operationColumnConfig.label)"
                #header
            >
                <slot
                    v-if="props.operationColumnConfig?.label?.slot"
                    :name="props.operationColumnConfig.label.slot"
                ></slot>
                <Component
                    v-else
                    :is="props.operationColumnConfig?.label?.render"
                />
            </template>
            <template #default="scoped">
                <OperationColumn
                    :scoped="scoped"
                    :config="props.operationColumnConfig"
                />
            </template>
        </el-table-column>
        <!-- 承接原 el-table 拥有的插槽 -->
        <template #empty>
            <slot name="empty"></slot>
        </template>
        <template #append>
            <slot name="append"></slot>
        </template>
    </el-table>
</template>
