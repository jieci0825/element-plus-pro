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

const getCellComp = (cell: CellConfig) => {
    if (isPresetCellTypeProps(cell)) {
        return cellCompMap[cell.cellType]
    }
    // TODO
    return undefined
}
</script>

<template>
    <div class="pro-table">
        <div class="search-wrapper"></div>
        <div class="content-wrapper">
            <div class="tool-bar-wrapper"></div>
            <div class="table-wrapper">
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
                                v-if="item.label.slot"
                                :name="item.label.slot"
                            ></slot>
                            <Component v-else :is="item.label.render" />
                        </template>
                        <template #default="scoped">
                            <Component
                                v-bind="omit(item, ['prop', 'cell'])"
                                :is="getCellComp(item.cell)"
                                :scoped="scoped"
                                :prop="item.prop"
                                :cellOpt="item.cell"
                            ></Component>
                        </template>
                    </el-table-column>
                    <!-- 操作列 -->
                    <el-table-column
                        v-if="!!operationColumnConfig"
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
                                v-if="operationColumnConfig.label.slot"
                                :name="operationColumnConfig.label.slot"
                            ></slot>
                            <Component
                                v-else
                                :is="operationColumnConfig.label.render"
                            />
                        </template>
                        <template #default="scoped">
                            <OperationColumn :config="operationColumnConfig" />
                        </template>
                    </el-table-column>
                    <!-- 承接元 el-table 拥有的插槽 -->
                    <slot name="empty"></slot>
                    <slot name="append"></slot>
                </el-table>
            </div>
        </div>
        <div class="pagination-wrapper"></div>
    </div>
</template>

<style lang="scss" scoped>
$gap: 15px;

.pro-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: $gap;
    overflow: hidden;

    .search-wrapper {
        width: 100%;
        height: 100px;
        background-color: skyblue;
    }

    .content-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $gap;
        padding: 0 $gap;
        overflow: hidden;

        .tool-bar-wrapper {
            width: 100%;
            height: 50px;
            background-color: pink;
            overflow: hidden;
        }

        .table-wrapper {
            flex: 1;
            background-color: lightblue;
            overflow: hidden;

            :deep(.el-table) {
                width: 100%;
                height: 100%;

                th.el-table__cell {
                    background-color: var(--el-fill-color-light);
                }
            }
        }
    }

    .pagination-wrapper {
        width: 100%;
        height: 50px;
        background-color: lightgreen;
    }
}
</style>
