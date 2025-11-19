<script setup lang="ts">
import { ProFormDialog, ProFormProps } from '@coderjc/element-plus-pro'
import { ref } from 'vue'

const visible = ref(false)
const formData = ref({
    productName: '',
    price: undefined,
    stock: undefined
})

const formProps: ProFormProps = {
    formItems: [
        {
            label: '商品名称',
            key: 'productName',
            type: 'input',
            required: true
        },
        {
            label: '价格',
            key: 'price',
            type: 'input_number',
            required: true,
            compProps: {
                min: 0,
                precision: 2
            }
        },
        {
            label: '库存',
            key: 'stock',
            type: 'input_number',
            compProps: {
                min: 0
            }
        }
    ],
    labelWidth: '100px'
}

const handleOpen = () => {
    visible.value = true
}

const handleSubmit = (data: any) => {
    ElMessage.success('商品保存成功：' + JSON.stringify(data))
}
</script>

<template>
    <div class="container">
        <el-button @click="handleOpen" type="success"
            >打开自定义 Footer 对话框</el-button
        >
        <ProFormDialog
            v-model="visible"
            v-model:formData="formData"
            :formProps="formProps"
            title="添加商品"
            width="600px"
            @submit="handleSubmit"
        >
            <template #footer="{ handleCancel, handleSubmit }">
                <el-button @click="handleCancel" icon="Close"
                    >取消并关闭</el-button
                >
                <el-button type="warning" @click="handleSubmit" icon="Check">
                    保存商品
                </el-button>
            </template>
        </ProFormDialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 400px;
}
</style>

