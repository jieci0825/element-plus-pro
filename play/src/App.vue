<script setup lang="ts">
import { ProForm, ProFormItemType } from '@jc/element-plus-pro-components'
import { h, ref } from 'vue'
import { FormRules } from 'element-plus'

const formItems = ref<ProFormItemType[]>([
    {
        label: '姓名',
        key: 'name',
        type: 'input',
        placeholder: '请输入姓名',
        elSlots: {
            // prepend: () => 'Http://'
            // - or 如果是字符串则可以直接书写
            prepend: 'Http://'
        }
    },
    {
        label: '自定义',
        key: 'custom',
        customSlot: true
    },
    {
        label: '性别',
        key: 'gender',
        type: 'select',
        placeholder: '请选择性别',
        elSlots: {
            footer: () => {
                return h('span', { style: { color: 'blue' } }, '自定义footer')
            }
        },
        options: [
            { label: '男', value: 'man' },
            { label: '女', value: 'woman' },
            {
                label: '保密',
                value: 'secret',
                elSlots: {
                    default: () => {
                        return h('span', { style: { color: 'red' } }, '保密')
                    }
                }
            }
        ]
    }
])

interface RuleForm {
    name: string
}

const rules: FormRules<RuleForm> = {
    name: [{ required: true, message: '必填项', trigger: 'blur' }]
}

const form = ref({})
</script>

<template>
    <div class="container">
        <ProForm
            label-width="100px"
            :rules="rules"
            :form-items="formItems"
            v-model="form"
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
