<script setup lang="ts">
import { isFunction, isObject } from '@jc/element-plus-pro-utils'
import { useAttrs } from 'vue'

// 接收父组件传递的props-modelValue
interface Props {
    modelValue: any
    formItemRaw: any
    options: any[]
}
const props = defineProps<Props>()
const attrs: any = useAttrs()
const slots = defineSlots()

const getElOptionDefaultSlot = (elSlot: any) => {
    if (!elSlot) return undefined
    if (isObject(elSlot)) {
        return (elSlot as any).default || elSlot
    }
    if (isFunction(elSlot)) {
        return elSlot
    }
}
</script>

<template>
    <el-select :model-value="props.modelValue" v-bind="attrs">
        <!-- 处理 el-select 的插槽 -->
        <template v-for="(_, slotName) in slots" #[slotName]>
            <Component :is="slots[slotName]" />
        </template>
        <el-option
            v-for="item in props.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
            <template #default>
                <Component
                    :is="getElOptionDefaultSlot(item.elSlots)"
                    :item="props.formItemRaw"
                />
            </template>
        </el-option>
    </el-select>
</template>
