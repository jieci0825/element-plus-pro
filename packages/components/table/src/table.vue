<script setup lang="ts">
import TableData from './table-data.vue'
import { ProTableSearch } from './search'
import { ProTableToolbar } from './toolbar'
import { proTableEmits, proTableProps } from './table'
import { computed, provide, useAttrs } from 'vue'
import {
    generateOperationColumnConfig,
    processColumnConfig
} from './process-column-config'
import './table.scss'
import { tableContextKey } from './constants'

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

provide(tableContextKey, {
    tableColumns: props.tableColumns,
    cellChange: onCellChange
})
</script>

<template>
    <div :class="['pro-table', componentStyleClass]">
        <div class="pro-table__search">
            <ProTableSearch></ProTableSearch>
        </div>
        <div class="pro-table__content">
            <div class="pro-table__toolbar">
                <ProTableToolbar></ProTableToolbar>
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
