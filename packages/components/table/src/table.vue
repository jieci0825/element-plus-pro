<script setup lang="ts">
import TableData from './table-data.vue'
import { ProTableSearch } from './search'
import { proTableEmits, proTableProps } from './table'
import { computed, provide, useAttrs } from 'vue'
import {
    generateOperationColumnConfig,
    processColumnConfig
} from './process-column-config'
import './table.scss'
import { tableContextKey } from './constants'
import { isObject } from '@jc/element-plus-pro-utils'
import { Refresh, Setting, Search, Plus, Delete } from '@element-plus/icons-vue'

defineOptions({
    name: 'ProTable'
})

const attrs = useAttrs()
const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const [originTableColumnConfig] = processColumnConfig(props)

const operationColumnConfig = computed(() => {
    return generateOperationColumnConfig(props)
})

const onCellChange = (
    row: Record<string, any>,
    prop: string | number,
    newValue: any
) => {
    const column = originTableColumnConfig.find((item) => item.prop === prop)
    emit('cellChange', row, column!, newValue)
}

const componentStyleClass = computed(() => {
    if (props.componentStyle === 'card') {
        return 'is-card'
    }
    return ''
})

const isShowSearch = computed(() => {
    // 如果有搜索列配置，则显示搜索栏
    const searchColumns = originTableColumnConfig.filter((item) =>
        isObject(item.search)
    )
    return searchColumns.length > 0
})

const onSearch = (payload: any) => {
    console.log(payload)
}

provide(tableContextKey, {
    tableColumns: props.tableColumns,
    cellChange: onCellChange
})
</script>

<template>
    <div :class="['pro-table', componentStyleClass]">
        <div class="pro-table__search" v-if="isShowSearch">
            <ProTableSearch @search="onSearch"></ProTableSearch>
        </div>
        <div class="pro-table__content">
            <div class="pro-table__header">
                <div class="pro-table__header--left">
                    <!-- TODO 补全传递的数据，批量选中的数据 -->
                    <div
                        v-if="props.title"
                        class="pro-table__header--left--title"
                    >
                        <span>{{ props.title }}</span>
                    </div>
                    <slot name="tableHeader"> </slot>
                </div>
                <div class="pro-table__header--right">
                    <el-button circle :icon="Refresh"></el-button>
                    <el-button circle :icon="Setting"></el-button>
                    <el-button circle :icon="Search"></el-button>
                </div>
            </div>
            <div class="pro-table__data">
                <TableData
                    v-bind="attrs"
                    :table-data="props.tableData"
                    :operation-column-config="operationColumnConfig"
                    :table-columns="props.tableColumns"
                >
                    <template
                        v-for="(_, slotName) in $slots"
                        #[slotName]="slotProps"
                    >
                        <slot :name="slotName" :slotProps="slotProps"></slot>
                    </template>
                </TableData>
            </div>
            <div class="pro-table__pagination"></div>
        </div>
    </div>
</template>
