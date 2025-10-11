<script setup lang="ts">
import { isString, omit } from '@jc/element-plus-pro-utils'
import { OperationColumnConfig } from './operation-column.type'
import OperationColumnCell from './operation-column-cell.vue'

const props = defineProps<{
    operationColumnConfig: Required<OperationColumnConfig>
}>()

const getLabel = (label: any) => {
    return isString(label) ? label : undefined
}
</script>

<template>
    <el-table-column
        v-bind="omit(props.operationColumnConfig, ['label', 'btnProps'])"
        :label="getLabel(props.operationColumnConfig.label)"
    >
        <template v-if="!isString(props.operationColumnConfig.label)" #header>
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
            <OperationColumnCell
                :scoped="scoped"
                :config="props.operationColumnConfig"
            />
        </template>
    </el-table-column>
</template>
