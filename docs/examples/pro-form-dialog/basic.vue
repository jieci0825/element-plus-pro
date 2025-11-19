<script setup lang="ts">
import { ProFormDialog, ProFormProps } from '@coderjc/element-plus-pro'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)
const formData = ref({
    username: '',
    email: '',
    age: undefined
})

const formProps: ProFormProps = {
    formItems: [
        {
            label: '用户名',
            key: 'username',
            type: 'input',
            required: true
        },
        {
            label: '邮箱',
            key: 'email',
            type: 'input',
            required: true,
            rules: [
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '年龄',
            key: 'age',
            type: 'input_number',
            props: {
                min: 1,
                max: 150
            }
        }
    ],
    labelWidth: '80px'
}

const handleOpen = () => {
    visible.value = true
}

const handleSubmit = (data: any) => {
    ElMessage.success('提交成功：' + JSON.stringify(data))
}
</script>

<template>
    <div class="container">
        <el-button @click="handleOpen" type="primary">打开表单对话框</el-button>
        <ProFormDialog
            v-model="visible"
            v-model:formData="formData"
            :formProps="formProps"
            title="编辑用户信息"
            width="600px"
            @submit="handleSubmit"
        />
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 400px;
}
</style>
