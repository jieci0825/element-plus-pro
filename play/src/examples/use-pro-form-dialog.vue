<script setup lang="ts">
import {
    ProFormDialog,
    ProFormProps
} from '@coderjc/element-plus-pro-components'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'

// 默认 footer 示例
const visible = ref(false)
const formData = ref({ username: '', email: '' })
const formProps: ProFormProps = {
    formItems: [
        { label: '用户名', key: 'username', type: 'input' },
        { label: '邮箱', key: 'email', type: 'input' }
    ],
    rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    },
    labelWidth: '80px'
}

const handleSubmit = (data) => {
    console.log('提交:', data)
}

const proFormDialogRef = useTemplateRef('proFormDialogRef')

// 自定义 footer 示例
const visible2 = ref(false)
const formData2 = ref({ name: '', age: undefined })
const formProps2: ProFormProps = {
    formItems: [
        { label: '姓名', key: 'name', type: 'input', required: true },
        {
            label: '年龄',
            key: 'age',
            type: 'input_number'
        }
    ],
    labelWidth: '80px'
}

const handleCustomSubmit = (data) => {
    console.log('自定义提交:', data)
}
</script>

<template>
    <div class="container">
        <div class="button-group">
            <el-button @click="visible = true" type="primary"
                >默认 Footer</el-button
            >
            <el-button @click="visible2 = true" type="success"
                >自定义 Footer</el-button
            >
        </div>
    </div>

    <!-- 默认 footer 示例 -->
    <ProFormDialog
        ref="proFormDialogRef"
        title="编辑信息"
        width="600px"
        v-model="visible"
        v-model:form-data="formData"
        :form-props="formProps"
        @submit="handleSubmit"
    />

    <!-- 自定义 footer 示例 -->
    <ProFormDialog
        title="自定义 Footer 对话框"
        width="600px"
        v-model="visible2"
        v-model:form-data="formData2"
        :form-props="formProps2"
        @submit="handleCustomSubmit"
    >
        <template #footer="{ handleCancel, handleSubmit }">
            <el-button @click="handleCancel" icon="Close">关闭</el-button>
            <el-button type="warning" @click="handleSubmit" icon="Check"
                >保存并关闭</el-button
            >
        </template>
    </ProFormDialog>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-group {
    display: flex;
    gap: 16px;
}
</style>
