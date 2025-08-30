<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { useAttrs, h } from 'vue'
import { TxtCellTypeProps } from '../table-cell.type'
import { ElTooltip } from 'element-plus'
import { isBoolean, isObject } from '@jc/element-plus-pro-utils'

const props = defineProps({
    scoped: {
        type: null as PropType<any>,
        default: undefined
    },
    prop: {
        type: [String, Number],
        required: true
    },
    cellOpt: {
        type: Object as PropType<TxtCellTypeProps>,
        required: true
    }
})
const attrs: any = useAttrs()

const cellData = computed(() => {
    return props.scoped.row[props.prop]
})

const className = computed(() => {
    return ['txt-cell']
})
</script>

<template>
    <span :class="className">
        {{ cellData }}
    </span>
</template>

<style scoped lang="scss">
.txt-cell {
    width: 100%;
    height: 100%;
}
</style>
