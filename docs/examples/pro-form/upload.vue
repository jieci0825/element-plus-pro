<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro'

const formItems: ProFormItemConfig[] = [
    {
        label: '头像',
        type: 'upload',
        mode: 'thumb',
        key: 'avatar',
        accept: 'image/*',
        // 设置上传的文件大小
        fileSize: 1024 * 1024 * 2,
        // 设置上传的文件数量
        limit: 1
    }
]

const value = ref({})

const handleSubmit = (data) => {
    console.log('thumb-submit', data)
    ElNotification({
        title: '表单数据',
        message: '控制台查看',
        type: 'info'
    })
}

const value2 = ref({})

const formItems2: ProFormItemConfig[] = [
    {
        label: '文件上传',
        type: 'upload',
        mode: 'drag',
        key: 'fileList',
        accept: 'image/*',
        // 设置上传的文件大小
        fileSize: 1024 * 1024 * 2,
        // 设置上传的文件数量
        limit: 5
    }
]
</script>

<template>
    <div class="demo-container">
        <div class="title">thumb</div>
        <ProForm
            v-model="value"
            label-width="80px"
            :form-items="formItems"
            @submit="handleSubmit"
        >
        </ProForm>
        <div class="title">drag</div>
        <ProForm
            v-model="value2"
            label-width="80px"
            :form-items="formItems2"
            @submit="handleSubmit"
        >
        </ProForm>
    </div>
</template>

<style scoped lang="scss">
.demo-container {
    width: 400px;

    .title {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
    }
}
</style>
