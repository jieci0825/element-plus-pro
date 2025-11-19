<script setup lang="ts">
import { ProForm } from '@coderjc/element-plus-pro'
import { h, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'
import type { ProFormItemConfig } from '@coderjc/element-plus-pro'

const formItems: ProFormItemConfig[] = [
    {
        label: '资源地址',
        key: 'url',
        type: 'input',
        // element-plus 原组件的属性可以平级传递
        placeholder: '请输入资源地址',
        elSlots: {
            prepend: 'http://',
            // append: () => h(ElIcon, null, () => h(Search)),
            append: () =>
                h(ElButton, {
                    icon: Search,
                    onClick: () => {
                        alert('点击了搜索按钮')
                    }
                }),
            prefix: () => '前缀...'
        }
    },
    {
        label: '资源类型',
        key: 'type',
        type: 'radio',
        options: [
            {
                label: '娱乐',
                value: 'image'
            },
            {
                label: 'AI',
                value: 'video',
                elSlots: {
                    default: () => h('i', { style: { color: 'red' } }, '工具')
                }
            }
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
    <div class="demo-container">
        <ProForm
            v-model="value"
            label-width="80px"
            :form-items="formItems"
            @submit="handleSubmit"
        ></ProForm>
    </div>
</template>

<style scoped lang="scss">
.demo-container {
    width: 500px;
}
</style>
