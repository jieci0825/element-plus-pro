<script setup lang="ts">
import {
    getElDefaultSlotAndToComponent,
    omit
} from '@coderjc/element-plus-pro-utils'
import { useAttrs } from 'vue'

const attrs: any = useAttrs()
</script>

<template>
    <el-checkbox-group v-bind="attrs">
        <el-checkbox
            v-for="item in attrs.options"
            :key="item.value"
            v-bind="omit(item, ['elSlots'])"
        >
            <Component :is="getElDefaultSlotAndToComponent(item)" />
        </el-checkbox>
    </el-checkbox-group>
</template>
