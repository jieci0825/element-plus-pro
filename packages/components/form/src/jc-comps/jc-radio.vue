<script setup lang="ts">
import {
    getElDefaultSlotAndToComponent,
    omit
} from '@jc/element-plus-pro-utils'
import { useAttrs } from 'vue'

const attrs: any = useAttrs()
</script>

<template>
    <el-radio-group v-bind="attrs">
        <el-radio
            v-for="item in attrs.options"
            :key="item.value"
            v-bind="omit(item, ['elSlots'])"
        >
            <Component :is="getElDefaultSlotAndToComponent(item)" />
        </el-radio>
    </el-radio-group>
</template>
