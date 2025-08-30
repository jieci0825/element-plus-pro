<script setup lang="ts">
import { isString, omit, toKebabCase } from '@jc/element-plus-pro-utils'
import { proTableProps } from './table'
import type { ProTableColumnType } from './table'
import { computed } from 'vue'
import { processColumnConfig } from './process-column-config'
import type { CellConfig, PresetCellType } from './table-cell.type'
import { isPresetCellTypeProps } from './table-cell.type'
import type { Component } from 'vue'
import { TxtCell } from './table-cell'
import { useAttrs } from 'vue'

defineOptions({
    name: 'ProTable'
})

const attrs = useAttrs()
const props = defineProps(proTableProps)

processColumnConfig(props)

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

    if (item.cell && isPresetCellTypeProps(item.cell)) {
        // 当为预设组件 txt 时，需要处理一些属性，因为进行了自定义，所以导致showOverflowTooltip没有预期的效果，所以在内部单独处理，这里进行删除，避免发生其他影响
        // 本质还是会处理这个属性，只是不再由el-table处理，而是由预设组件内部处理
        if (item.cell.cellType === 'txt') {
            omitKeys.push(...toKebabCase('showOverflowTooltip'))
            omitKeys.push(...toKebabCase('tooltipFormatter'))
        }
    }

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
                    <el-table-column v-if="!!props.operationColumn">
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
