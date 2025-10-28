<script setup lang="ts">
import './jc-label-tooltip.scss'
import { ElTooltip } from 'element-plus'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    tooltip: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="jc-label-tooltip">
        <span class="label">{{ label }}</span>
        <el-tooltip effect="dark" :content="props.tooltip" placement="top">
            <span class="tooltip">
                <span>?</span>
            </span>
        </el-tooltip>
    </div>
</template>
