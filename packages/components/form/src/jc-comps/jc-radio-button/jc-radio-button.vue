<script setup lang="ts">
import {
    getElDefaultSlotAndToComponent,
    omit
} from '@coderjc/element-plus-pro-utils'
import { useAttrs } from 'vue'
import { ElRadioButton, ElRadioGroup } from 'element-plus'

const attrs: any = useAttrs()
</script>

<template>
    <el-radio-group v-bind="attrs">
        <el-radio-button
            v-for="item in attrs.options"
            :key="item.value"
            v-bind="omit(item, ['elSlots'])"
        >
            <Component :is="getElDefaultSlotAndToComponent(item)" />
        </el-radio-button>
    </el-radio-group>
</template>
