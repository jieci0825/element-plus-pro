<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { ref } from 'vue'
import { ElNotification, ElTag } from 'element-plus'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro'

const formItems: ProFormItemConfig[] = [
    {
        label: '姓名',
        key: 'name',
        placeholder: '请输入姓名'
    },
    {
        label: '个人标签',
        key: 'tags',
        customSlot: true
    }
]

const value = ref({})

const handleSubmit = (data) => {
    ElNotification({
        title: '表单数据',
        message: JSON.stringify(data, null, 2),
        type: 'success'
    })
}
</script>

<template>
    <div class="container">
        <ProForm
            v-model="value"
            label-width="80px"
            :form-items="formItems"
            @submit="handleSubmit"
        >
            <template #tags>
                <div style="display: flex; gap: 10px">
                    <el-tag type="primary">游戏</el-tag>
                    <el-tag type="success">睡觉</el-tag>
                    <el-tag type="danger">牛马</el-tag>
                </div>
            </template>
        </ProForm>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 400px;
}
</style>
