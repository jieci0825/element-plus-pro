<script setup lang="ts">
import { ref } from 'vue'
import { useProDialog } from '@coderjc/element-plus-pro-hooks'
import { ProForm } from '@coderjc/element-plus-pro-components'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro-components'

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

const formData = ref({})

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
}

const handleOpen = () => {
    const { destory, instance } = useProDialog(ProForm, {
        props: {
            modelValue: formData,
            'onUpdate:modelValue': (value) => {
                formData.value = value
            },
            formItems,
            rules,
            labelWidth: '100px',
            footerConfig: {
                onSubmit: (data) => {
                    console.log(data)
                    instance.value
                        ?.validate()
                        .then(() => {
                            console.log('验证通过')
                            destory()
                        })
                        .catch(() => {
                            console.log('验证失败')
                        })
                }
            }
        },
        dialogProps: {
            width: '500px'
        }
    })

    console.log(instance)
}
</script>

<template>
    <div class="container">
        <div class="button-group">
            <el-button @click="handleOpen" type="primary">打开</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
