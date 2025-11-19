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
        // 可以简单的设置 span 控制列数，也可以通过 xs、sm、md、lg、xl, 设置响应式列数
        col: { span: 12 },
        placeholder: '请输入用户名'
    },
    {
        label: '密码',
        key: 'password',
        type: 'password',
        col: { span: 12 },
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
            { label: '保密', value: 3 }
        ]
    },
    {
        label: '爱好',
        key: 'hobby',
        type: 'checkbox',
        options: [
            { label: '篮球', value: 1 },
            { label: '足球', value: 2 },
            { label: '羽毛球', value: 3 },
            { label: '乒乓球', value: 4 }
        ]
    },
    {
        label: '生日',
        key: 'birthday',
        type: 'date',
        placeholder: '请选择生日'
    },
    {
        label: '地址',
        key: 'address',
        type: 'textarea',
        placeholder: '请输入地址'
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
    <div class="demo-container">
        <ProForm
            v-model="value"
            label-width="80px"
            :form-items="formItems"
            :gutter="20"
            @submit="handleSubmit"
        ></ProForm>
    </div>
</template>

<style scoped lang="scss">
.demo-container {
    width: 500px;
}
</style>
