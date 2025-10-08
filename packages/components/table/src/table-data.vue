<script setup lang="ts">
import OperationColumn from './operation-column/operation-column.vue'
import { isString, omit } from '@jc/element-plus-pro-utils'
import { computed, useAttrs } from 'vue'
import type { ProTableColumnType } from './table'
import type { PropType, Component } from 'vue'
import type { OperationColumnConfig } from './operation-column/operation-column.type'
import TableColumnRecursive from './table-column-recursive.vue'

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

const getLabel = (label: any) => {
    return isString(label) ? label : undefined
}
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
            v-if="props.selection"
            :align="'center'"
        ></el-table-column>
        <!-- 表格列 -->
        <TableColumnRecursive :tableColumns="props.tableColumns">
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
                <slot :name="slotName" :row="slotProps.row"></slot>
            </template>
        </TableColumnRecursive>
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
                    :config="
                        props.operationColumnConfig as Required<OperationColumnConfig>
                    "
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
