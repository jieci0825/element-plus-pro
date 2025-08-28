<script setup lang="ts">
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

<style scoped lang="scss">
.jc-label-tooltip {
    display: flex;
    align-items: center;
    .tooltip {
        margin-left: 5px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--el-color-info);
        color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        & > span {
            transform: scale(0.9);
        }
    }
}
</style>
