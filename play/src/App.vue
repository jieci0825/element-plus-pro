<script setup lang="ts">
import { ProForm, ProFormItemType } from '@jc/element-plus-pro-components'
import { ref } from 'vue'
import { FormRules } from 'element-plus'

const formItems: ProFormItemType[] = [
    // {
    //     label: '姓名',
    //     key: 'name',
    //     type: 'input',
    //     placeholder: '请输入姓名',
    //     elSlots: {
    //         // prepend: () => 'Http://'
    //         // - or 如果是字符串则可以直接书写
    //         prepend: 'Http://'
    //     }
    // },
    // {
    //     label: '自定义',
    //     key: 'custom',
    //     customSlot: true
    // },
    {
        label: '性别',
        key: 'gender',
        type: 'select',
        placeholder: '请选择性别',
        options: [
            { label: '男', value: 'man' },
            { label: '女', value: 'woman' }
        ]
    }
]

interface RuleForm {
    name: string
}

const rules: FormRules<RuleForm> = {
    name: [{ required: true, message: '必填项', trigger: 'blur' }]
}

const form = ref({})
</script>

<template>
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
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
