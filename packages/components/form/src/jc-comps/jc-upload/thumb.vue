<script setup lang="ts">
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import './thumb.scss'

const props = defineProps(['fileList', 'limit'])
const emit = defineEmits(['remove', 'click', 'preview'])
</script>

<template>
    <div class="jc-upload-thumb">
        <div
            class="jc-upload-list__item-wrapper"
            v-for="(file, index) in fileList"
            :key="index"
        >
            <img class="jc-upload-list__item-thumbnail" :src="file.url" />
            <span class="jc-upload-list__item-actions">
                <span
                    @click="emit('preview', index)"
                    class="jc-upload-list__item-action"
                >
                    <el-icon><zoom-in /></el-icon>
                </span>
                <span
                    @click="emit('remove', index)"
                    class="jc-upload-list__item-action"
                >
                    <el-icon><Delete /></el-icon>
                </span>
            </span>
        </div>
        <!-- 添加 -->
        <div
            class="jc-upload-list__item-wrapper"
            v-if="fileList.length < props.limit"
            @click="emit('click')"
        >
            <el-icon size="30" color="#c0c4cc"><Plus /></el-icon>
        </div>
    </div>
</template>
