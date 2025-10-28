<script setup lang="ts">
import { PropType, ref, watch, inject } from 'vue'
import type { InputCellTypeProps } from '../../table-cell.type'
import './input-cell.scss'
import { tableContextKey } from '../../constants'
import { ElInput } from 'element-plus'

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
        type: Object as PropType<InputCellTypeProps>,
        required: true
    }
})

const tableContext = inject(tableContextKey)

const model = ref(props.scoped?.row?.[props.prop] ?? '')

watch(
    () => props.scoped?.row?.[props.prop],
    (val) => {
        model.value = val ?? ''
    }
)

const onChange = () => {
    tableContext?.cellChange(props.scoped.row, props.prop, model.value)
}
</script>

<template>
    <div :class="['input-cell']">
        <el-input
            v-model="model"
            :size="cellOpt.size"
            :placeholder="cellOpt.placeholder"
            @change="onChange"
            @keyup.enter.native="onChange"
            clearable
        />
    </div>
</template>
