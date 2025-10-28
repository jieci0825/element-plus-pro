<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro'
import type { FormRules } from 'element-plus'

const formItems: ProFormItemConfig[] = [
    {
        label: '用户名',
        key: 'username',
        type: 'input',
        placeholder: '请输入用户名'
    },
    {
        label: '密码',
        key: 'password',
        type: 'password',
        props: {
            placeholder: '请输入密码',
            showPassword: true
        }
    },
    {
        label: '性别',
        key: 'gender',
        type: 'radio',
        options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
            { label: '保密', value: 3, disabled: true }
        ]
    }
]

const value = ref({})

interface RuleForm {
    username: string
    password: string
    gender: string
}
const rules: FormRules<RuleForm> = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
    ],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
}

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
            :rules="rules"
            :form-items="formItems"
            @submit="handleSubmit"
        ></ProForm>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 400px;
}
</style>
