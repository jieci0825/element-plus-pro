<script setup lang="ts">
import { isFunction, isObject, omit } from '@jc/element-plus-pro-utils'
import { useAttrs } from 'vue'

const attrs: any = useAttrs()
const slots = defineSlots()

const getElDefaultSlot = (elSlots: any) => {
    if (!elSlots) return undefined
    if (isObject(elSlots)) {
        return (elSlots as any).default || elSlots
    }
    if (isFunction(elSlots)) {
        return elSlots
    }
}
</script>

<template>
    <el-select v-bind="attrs">
        <!-- 处理 el-select 的插槽 -->
        <template v-for="(_, slotName) in slots" #[slotName]>
            <Component :is="slots[slotName]" />
        </template>
        <el-option-group
            v-for="group in attrs.options"
            :key="group.label"
            v-bind="omit(group, ['elSlots', 'options'])"
        >
            <template v-if="group.elSlots">
                <Component :is="getElDefaultSlot(group.elSlots)" />
            </template>
            <template v-else>
                <el-option
                    v-for="item in group.options"
                    v-bind="omit(item, ['elSlots'])"
                >
                    <template #default>
                        <Component :is="getElDefaultSlot(item.elSlots)" />
                    </template>
                </el-option>
            </template>
        </el-option-group>
    </el-select>
</template>
