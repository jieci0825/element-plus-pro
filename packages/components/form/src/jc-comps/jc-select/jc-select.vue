<script setup lang="ts">
import {
    getElDefaultSlotAndToComponent,
    omit
} from '@coderjc/element-plus-pro-utils'
import { useAttrs } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

const attrs: any = useAttrs()
const slots = defineSlots()
</script>

<template>
    <el-select v-bind="attrs">
        <!-- 处理 el-select 的插槽 -->
        <template v-for="(_, slotName) in slots" #[slotName]>
            <Component :is="slots[slotName]" />
        </template>
        <el-option
            v-for="item in attrs.options"
            :key="item.value"
            v-bind="omit(item, ['elSlots'])"
        >
            <Component :is="getElDefaultSlotAndToComponent(item)" />
        </el-option>
    </el-select>
</template>
