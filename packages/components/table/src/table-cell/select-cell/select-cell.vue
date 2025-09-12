<script setup lang="ts">
import { PropType, ref, watch, inject } from 'vue'
import type { SelectCellTypeProps } from '../../table-cell.type'
import './select-cell.scss'
import { tableContextKey } from '../../constants'

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
        type: Object as PropType<SelectCellTypeProps>,
        required: true
    }
})

const tableContext = inject(tableContextKey)

const defaultValue = props.cellOpt.multiple ? [] : ''
const model = ref(props.scoped?.row?.[props.prop] ?? defaultValue)

watch(
    () => props.scoped?.row?.[props.prop],
    (val) => {
        model.value = val ?? defaultValue
    }
)

const onChange = () => {
    tableContext?.cellChange(props.scoped.row, props.prop, model.value)
}
</script>

<template>
    <div :class="['select-cell']">
        <el-select
            v-model="model"
            :size="cellOpt.size"
            :multiple="cellOpt.multiple"
            :disabled="cellOpt.disabled"
            clearable
            filterable
            @change="onChange"
        >
            <el-option
                v-for="opt in cellOpt.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
                :disabled="opt.disabled"
            />
        </el-select>
    </div>
</template>
