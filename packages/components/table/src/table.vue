<script setup lang="ts">
import { isString, omit } from '@jc/element-plus-pro-utils'
import { proTableProps } from './table'
import type { ProTableColumnType } from './table'
import { computed } from 'vue'
import {
    generateOperationColumnConfig,
    processColumnConfig
} from './process-column-config'
import type { CellConfig, PresetCellType } from './table-cell.type'
import { isPresetCellTypeProps } from './table-cell.type'
import type { Component } from 'vue'
import { TxtCell } from './table-cell'
import { useAttrs } from 'vue'
import OperationColumn from './operation-column.vue'
import './table.scss'

defineOptions({
    name: 'ProTable'
})

const attrs = useAttrs()
const props = defineProps(proTableProps)

processColumnConfig(props)
const operationColumnConfig = computed(() => {
    return generateOperationColumnConfig(props)
})
const cellCompMap: { [key in PresetCellType]: Component } = {
    txt: TxtCell,
    dot_tag: TxtCell,
    image: TxtCell,
    input: TxtCell,
    switch: TxtCell,
    progress: TxtCell,
    input_number: TxtCell,
    tag: TxtCell,
    select: TxtCell
}

// 处理 el-table 的 props 属性
const elTableProps = computed(() => {
    return omit(attrs, ['data'])
})

const getElTableColumnProps = (item: ProTableColumnType) => {
    const omitKeys = ['label', 'cell', 'hidden']

    return omit(item, omitKeys)
}

const getCellComp = (cell: CellConfig | undefined) => {
    if (isPresetCellTypeProps(cell)) {
        return cellCompMap[cell.cellType]
    }
    // TODO
    return undefined
}
</script>

<template>
    <div class="pro-table">
        <div class="pro-table__search"></div>
        <div class="pro-table__content">
            <div class="pro-table__toolbar"></div>
            <div class="pro-table__data">
                <el-table :data="props.tableData" v-bind="elTableProps">
                    <el-table-column
                        v-for="item in props.tableColumns"
                        :key="item.prop"
                        v-bind="getElTableColumnProps(item)"
                        :label="isString(item.label) ? item.label : undefined"
                        :show-overflow-tooltip="
                            item.showOverflowTooltip === undefined
                                ? true
                                : item.showOverflowTooltip
                        "
                    >
                        <template v-if="!isString(item.label)" #header>
                            <slot
                                v-if="item.label?.slot"
                                :name="item.label.slot"
                            ></slot>
                            <Component v-else :is="item.label?.render" />
                        </template>
                        <template #default="scoped">
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
                        v-if="!!props.operationColumn"
                        v-bind="
                            omit(operationColumnConfig, ['label', 'btnProps'])
                        "
                        :label="
                            isString(operationColumnConfig.label)
                                ? operationColumnConfig.label
                                : undefined
                        "
                    >
                        <template
                            v-if="!isString(operationColumnConfig.label)"
                            #header
                        >
                            <slot
                                v-if="operationColumnConfig?.label?.slot"
                                :name="operationColumnConfig.label.slot"
                            ></slot>
                            <Component
                                v-else
                                :is="operationColumnConfig?.label?.render"
                            />
                        </template>
                        <template #default="scoped">
                            <OperationColumn
                                :scoped="scoped"
                                :config="operationColumnConfig"
                            />
                        </template>
                    </el-table-column>
                    <!-- 承接元 el-table 拥有的插槽 -->
                    <slot name="empty"></slot>
                    <slot name="append"></slot>
                </el-table>
            </div>
        </div>
        <div class="pro-table__pagination"></div>
    </div>
</template>
