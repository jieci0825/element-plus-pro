<script setup lang="ts">
import TableData from './table-data.vue'
import { proTableProps } from './table'
import { computed, reactive, provide, useAttrs } from 'vue'
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

processColumnConfig(props)

const operationColumnConfig = computed(() => {
    return generateOperationColumnConfig(props)
})

provide(tableContextKey, reactive({}))
</script>

<template>
    <div class="pro-table">
        <div class="pro-table__search"></div>
        <div class="pro-table__content">
            <div class="pro-table__toolbar"></div>
            <div class="pro-table__data">
                <TableData
                    v-bind="attrs"
                    :table-data="props.tableData"
                    :operation-column-config="operationColumnConfig"
                    :table-columns="props.tableColumns"
                >
                    <template v-for="(_, slotName) in $slots" #[slotName]>
                        <slot :name="slotName"></slot>
                    </template>
                </TableData>
            </div>
        </div>
        <div class="pro-table__pagination"></div>
    </div>
</template>
