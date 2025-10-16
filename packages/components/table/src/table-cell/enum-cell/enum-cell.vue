<script setup lang="ts">
import { computed, PropType } from 'vue'
import { EnumCellTypeProps } from '../../table-cell.type'
import { inject } from 'vue'
import './enum-cell.scss'
import { tableContextKey } from '../../constants'
import { ElTag } from 'element-plus'
import { isObject, omit } from '@coderjc/element-plus-pro-utils'

const props = defineProps({
    scoped: {
        type: null as unknown as PropType<any>,
        required: true
    },
    prop: {
        type: [String, Number],
        required: true
    },
    cellOpt: {
        type: Object as PropType<EnumCellTypeProps>,
        required: true
    }
})

const tabelContextInject = inject(tableContextKey)

const selfAlign = computed(() => {
    const align = tabelContextInject?.tableColumns.find(
        (item) => item.prop === props.prop
    )?.align
    return align
})

// 找到枚举中的值
const getEnumValue = (key: string) => {
    if (props.cellOpt.valueEnum && isObject(props.cellOpt.valueEnum)) {
        const v = props.cellOpt.valueEnum[key]
        return v
    }
    return undefined
}

const data = computed(() => {
    const key = props.scoped.row[props.prop]
    const value = getEnumValue(key)
    if (value === undefined) {
        return key
    }
    if (isObject(value)) {
        return value.text
    }
    return value
})

const getElTagProps = () => {
    const defaultProps = {
        type: 'primary'
    }
    const value = getEnumValue(props.scoped.row[props.prop])
    if (isObject(value)) {
        return {
            ...defaultProps,
            ...omit(value, ['text'])
        }
    }
    return defaultProps
}
</script>

<template>
    <div :class="['enum-cell', selfAlign && `enum-cell--${selfAlign}`]">
        <Component
            :is="() => props.cellOpt?.render?.(props.scoped.row)"
            v-if="!!props.cellOpt?.render"
        />
        <el-tag v-bind="getElTagProps()" v-else>{{ data }}</el-tag>
    </div>
</template>
