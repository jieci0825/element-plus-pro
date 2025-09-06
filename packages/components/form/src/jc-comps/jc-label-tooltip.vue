<script setup lang="ts">
// 导入样式文件
import './jc-label-tooltip.scss'

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
