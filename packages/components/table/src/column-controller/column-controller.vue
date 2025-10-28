<script setup lang="ts">
import { isObject, isString } from '@coderjc/element-plus-pro-utils'
import { markRaw } from 'vue'
import { ProTableColumnType } from '../table'
import { ref } from 'vue'
import { ElTable, ElTableColumn, ElSwitch } from 'element-plus'

const props = defineProps(['columns', 'allSlots'])

const tableData = ref([])
function formatColumns() {
    tableData.value = props.columns.map((item: ProTableColumnType) => {
        return {
            label: normalizationLabel(item.label),
            prop: item.prop,
            hidden: !Boolean(item.hidden)
        }
    })
}
formatColumns()

function normalizationLabel(label: ProTableColumnType['label']) {
    if (isObject(label)) {
        if (label.render) {
            return markRaw(label.render)
        }
        if (isString(label.slot)) {
            return markRaw(props.allSlots[label.slot])
        }
    } else {
        return markRaw(() => label)
    }
}
</script>

<template>
    <div class="column-controller">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="表头">
                <template #default="{ row }">
                    <Component :is="row.label" />
                </template>
            </el-table-column>
            <el-table-column label="显示">
                <template #default="{ row }">
                    <el-switch
                        @change="$emit('change', row)"
                        v-model="row.hidden"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    ></el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
