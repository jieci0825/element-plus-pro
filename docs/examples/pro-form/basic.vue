<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro'

const formItems: ProFormItemConfig[] = [
    {
        label: '用户名',
        key: 'username',
        type: 'input',
        tooltip: '用户名是唯一的，用于账号登录',
        // element-plus 原组件的属性可以平级传递
        placeholder: '请输入用户名'
    },
    {
        label: '密码',
        key: 'password',
        type: 'password',
        // 也可以通过 props 传递
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
        ></ProForm>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 400px;
}
</style>
