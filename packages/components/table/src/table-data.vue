<script setup lang="ts">
import { OperationColumn } from './operation-column'
import { omit } from '@coderjc/element-plus-pro-utils'
import { computed, useAttrs } from 'vue'
import type { ProTableColumnType } from './table'
import type { PropType } from 'vue'
import type { OperationColumnConfig } from './operation-column'
import TableColumn from './table-column.vue'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'

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
    },
    selection: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const attrs = useAttrs()

// 处理 el-table 的 props 属性
const elTableProps = computed(() => {
    return omit(attrs, ['data'])
})
</script>

<template>
    <el-table
        :data="props.tableData"
        v-bind="elTableProps"
        v-loading="props.loading"
    >
        <!-- 多选 -->
        <el-table-column
            width="50"
            type="selection"
            align="center"
            v-if="props.selection"
        ></el-table-column>
        <!-- 表格列 -->
        <TableColumn
            v-for="(column, index) in props.tableColumns"
            :key="column.prop || index"
            :column="column"
        >
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps"></slot>
            </template>
        </TableColumn>
        <!-- 操作列 -->
        <OperationColumn
            v-if="props.operationColumnConfig"
            :operation-column-config="
                props.operationColumnConfig as Required<OperationColumnConfig>
            "
        ></OperationColumn>
        <!-- 承接原 el-table 拥有的插槽 -->
        <template #empty>
            <slot name="empty"></slot>
        </template>
        <template #append>
            <slot name="append"></slot>
        </template>
    </el-table>
</template>
