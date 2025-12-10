<script setup lang="ts">
import {
    ProForm,
    ProFormFooterConfig,
    ProFormItemConfig
} from '@coderjc/element-plus-pro-components'
import { h, ref, useTemplateRef } from 'vue'
import {
    ElIcon,
    ElInput,
    ElMessage,
    ElNotification,
    FormRules
} from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const formItems: ProFormItemConfig[] = [
    // {
    //     label: '姓名',
    //     key: 'name',
    //     type: 'input',
    //     placeholder: '请输入姓名',
    //     tooltip: '可以是网名'
    // },
    {
        label: '个人主页',
        key: 'homepage',
        type: 'input',
        props: {
            placeholder: 'www.me.com'
        },
        elSlots: {
            // prepend: () => 'Http://'
            // - or 如果是字符串则可以直接书写
            prepend: 'Http://',
            append: () => h(ElIcon, null, () => h(Search))
        }
    },
    {
        label: '年龄',
        key: 'password',
        type: 'password',
        props: {
            showPassword: true
        }
    },
    {
        label: '头像',
        type: 'upload',
        mode: 'thumb',
        key: 'avatar',
        accept: '*',
        limit: 1,
        fileSize: 1 * 1024 * 1024,
        onFileSizeExceed(file: File) {
            ElMessage.warning('文件大小超出限制')
        }
    },
    {
        label: '自定义',
        key: 'custom',
        customSlot: true
    },
    {
        label: '城市',
        key: 'city',
        type: 'group_select',
        placeholder: '请选择城市',
        options: [
            {
                label: '热门城市',
                options: [
                    { label: '北京', value: 'beijing' },
                    { label: '上海', value: 'shanghai' },
                    { label: '广州', value: 'guangzhou' },
                    { label: '深圳', value: 'shenzhen' }
                ]
            },
            {
                label: '其他城市',
                options: [
                    {
                        label: '成都',
                        value: 'chengdu'
                    },
                    { label: '武汉', value: 'wuhan' },
                    { label: '重庆', value: 'chongqing' },
                    { label: '西安', value: 'xian' },
                    { label: '杭州', value: 'hangzhou' },
                    { label: '南京', value: 'nanjing' },
                    { label: '长沙', value: 'changsha' }
                ]
            }
        ]
    },
    {
        label: '性别',
        key: 'gender',
        type: 'radio',
        options: [
            { label: '男', value: 'male' },
            {
                label: '女',
                value: 'female',
                elSlots: {
                    default: () => h('i', { style: { color: 'red' } }, '女')
                }
            }
        ]
    },
    {
        label: '爱好',
        key: 'hobby',
        type: 'checkbox',
        options: [
            { label: '篮球', value: 'basketball' },
            { label: '足球', value: 'football' },
            { label: '乒乓球', value: 'pingpang' },
            { label: '羽毛球', value: 'badminton', disabled: true }
        ]
    },
    {
        label: '个性签名',
        key: 'signature',
        type: 'textarea',
        placeholder: '请输入个性签名',
        props: {}
    },
    {
        label: '隐私空间',
        key: 'privacy',
        type: 'switch',
        activeText: '开启',
        inactiveText: '关闭',
        activeValue: 1,
        inactiveValue: 0
    },
    {
        label: '生日',
        key: 'birthday',
        type: 'date'
    },
    {
        label: '主页背景色',
        key: 'color',
        type: 'color'
    }
]

const footerConfig: ProFormFooterConfig = {
    align: 'right',
    submitBtn: true,
    resetBtn: false
}
// const footerConfig = null

interface RuleForm {
    name: string
    gender: string
}

const rules: FormRules<RuleForm> = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
}

const form = ref({
    name: '张三',
    avatar: 'https://coderjcnodejs-1312270807.cos.ap-guangzhou.myqcloud.com/shops/0/logo/1765248226588_yv9bgenubvn.jpg'
})
const formInstance = useTemplateRef('formRef')
const handleValidate = () => {
    // 具体使用同 element-plus
    //  - https://element-plus.org/zh-CN/component/form.html#表单校验
    formInstance.value.validate()
}

const handleSubmit = (value) => {
    ElNotification({
        title: '表单数据',
        message: JSON.stringify(value, null, 2),
        type: 'success'
    })
}
</script>

<template>
    <div class="container">
        <div style="margin-bottom: 20px">
            <el-button type="primary" @click="() => console.log(form)"
                >获取值</el-button
            >
            <el-button type="warning" @click="handleValidate">校验</el-button>
        </div>
        <ProForm
            label-width="100px"
            :rules="rules"
            :form-items="formItems"
            :footer-config="footerConfig"
            v-model="form"
            ref="formRef"
            @submit="handleSubmit"
        >
            <template #custom>
                <i>自定义slot</i>
            </template>
        </ProForm>
    </div>
</template>

<style scoped>
.container {
    width: 500px;
    border: 1px solid #ccc;
    padding: 20px;
}
</style>
