<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { useAttrs, h } from 'vue'
import { TxtCellTypeProps } from '../table-cell.type'
import { ElTooltip } from 'element-plus'
import { isBoolean } from '@jc/element-plus-pro-utils'

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

const value = computed(() => {
    return props.scoped.row[props.prop]
})

const className = computed(() => {
    const isTooltip =
        attrs.showOverflowTooltip === undefined
            ? true
            : !!attrs.showOverflowTooltip
    return ['txt-cell', isTooltip ? 'txt-cell-tooltip' : '']
})
</script>

<template>
    <div :class="className">
        <template v-if="attrs.showOverflowTooltip">
            <el-tooltip
                :content="value"
                :placement="attrs.showOverflowTooltip.placement || 'top'"
                v-bind="
                    isBoolean(attrs.showOverflowTooltip)
                        ? {}
                        : attrs.showOverflowTooltip
                "
            >
                <span>{{ value }}</span>
            </el-tooltip>
        </template>
        <span v-else>{{ value }}</span>
    </div>
</template>

<style scoped lang="scss">
.txt-cell {
    width: 100%;
    height: 100%;

    &-tooltip {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
