<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import type {
    ProFormFooterConfig,
    ProFormItemConfig
} from '@coderjc/element-plus-pro'

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
            { label: '保密', value: 3 }
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

// const footerConfig = null // 关闭
const footerConfig: ProFormFooterConfig = {
    align: 'right',
    // 隐藏重置按钮
    resetBtn: false,
    // 将会替换掉默认的提交按钮事件，即 handleSubmit
    onSubmit: (data) => {
        ElNotification({
            title: 'onSubmit-表单数据',
            message: JSON.stringify(data, null, 2),
            type: 'error'
        })
    },
    submitBtn: {
        text: '提交数据',
        icon: Document,
        hide: false
    }
}
</script>

<template>
    <div class="container">
        <ProForm
            v-model="value"
            label-width="80px"
            :form-items="formItems"
            :footer-config="footerConfig"
            @submit="handleSubmit"
        ></ProForm>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 400px;
}
</style>
