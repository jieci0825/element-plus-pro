<script setup lang="ts">
import { isFunction, isObject, omit } from '@jc/element-plus-pro-utils'
import { useAttrs } from 'vue'

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
    <el-select v-bind="attrs">
        <!-- 处理 el-select 的插槽 -->
        <template v-for="(_, slotName) in slots" #[slotName]>
            <Component :is="slots[slotName]" />
        </template>
        <el-option
            v-for="item in attrs.options"
            v-bind="omit(item, ['elSlots'])"
        >
            <template #default>
                <Component :is="getElOptionDefaultSlot(item.elSlots)" />
            </template>
        </el-option>
    </el-select>
</template>
