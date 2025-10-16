<script setup lang="ts">
import { PropType, computed } from 'vue'
import { SwitchCellTypeProps } from '../../table-cell.type'
import { omit } from '@coderjc/element-plus-pro-utils'

const props = defineProps({
    scoped: {
        type: null as unknown as PropType<any>,
        default: undefined
    },
    prop: {
        type: [String, Number],
        required: true
    },
    cellOpt: {
        type: Object as PropType<SwitchCellTypeProps>,
        required: true
    }
})

const model = computed(() => {
    return props.scoped.row[props.prop]
})
</script>

<template>
    <div :class="['progress-cell']">
        <el-progress
            :percentage="model"
            v-bind="omit(cellOpt, ['cellType', 'percentage'])"
        />
    </div>
</template>
