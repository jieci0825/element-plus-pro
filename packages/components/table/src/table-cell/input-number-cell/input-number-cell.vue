<script setup lang="ts">
import { PropType, ref, watch, inject } from 'vue'
import type { InputNumberCellTypeProps } from '../../table-cell.type'
import './input-number-cell.scss'
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
        type: Object as PropType<InputNumberCellTypeProps>,
        required: true
    }
})

const tableContext = inject(tableContextKey)

const model = ref(Number(props.scoped?.row?.[props.prop] ?? 0))

watch(
    () => props.scoped?.row?.[props.prop],
    (val) => {
        model.value = Number(val ?? 0)
    }
)

const onChange = () => {
    tableContext?.cellChange(props.scoped.row, props.prop, model.value)
}
</script>

<template>
    <div class="input-number-cell">
        <el-input-number
            v-model="model"
            :size="cellOpt.size"
            :min="cellOpt.min"
            :max="cellOpt.max"
            :step="cellOpt.step"
            @change="onChange"
        />
    </div>
</template>
