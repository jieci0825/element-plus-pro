<script setup lang="ts">
import { getElDefaultSlot, omit } from '@jc/element-plus-pro-utils'
import { useAttrs } from 'vue'

const attrs: any = useAttrs()
console.log(attrs.options[0], 'attrs')
</script>

<template>
    <el-checkbox-group v-bind="attrs">
        <el-checkbox
            v-for="item in attrs.options"
            :key="item.value"
            v-bind="omit(item, ['elSlots'])"
        >
            <template #default>
                <Component :is="getElDefaultSlot(item.elSlots)" />
            </template>
        </el-checkbox>
    </el-checkbox-group>
</template>
