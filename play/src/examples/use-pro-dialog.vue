<script setup lang="ts">
import { ProDialog, ProFormDialog } from '@coderjc/element-plus-pro-components'
import { ref } from 'vue'

// ProDialog 示例
const visible = ref(false)
const handleOpen = () => {
    visible.value = true
}
const handleClose = () => {
    visible.value = false
}

const inputValue = ref('')

// ProFormDialog 示例
const formDialogVisible = ref(false)
const formData = ref({
    username: '',
    email: '',
    age: undefined
})

const formProps = {
    formItems: [
        {
            label: '用户名',
            key: 'username',
            type: 'input',
            required: true
        },
        {
            label: '邮箱',
            key: 'email',
            type: 'input',
            required: true,
            rules: [
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '年龄',
            key: 'age',
            type: 'input-number',
            compProps: {
                min: 1,
                max: 150
            }
        }
    ]
}

const handleOpenFormDialog = () => {
    formDialogVisible.value = true
}
</script>

<template>
    <div class="container">
        <div class="button-group">
            <el-button @click="handleOpen" type="primary"
                >打开 ProDialog</el-button
            >
            <el-button @click="handleOpenFormDialog" type="success"
                >打开 ProFormDialog</el-button
            >
        </div>

        <!-- ProDialog 示例 -->
        <ProDialog width="500px" v-model="visible">
            <template #header>
                <h3>自定义标题</h3>
            </template>
            <template #default>
                <div>内容区域，将会在每次关闭后销毁</div>
                <el-input type="text" v-model="inputValue" />
                <div style="height: 100px">123</div>
            </template>
            <template #footer>
                <el-button @click="handleClose">关闭</el-button>
            </template>
        </ProDialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-group {
    display: flex;
    gap: 16px;
}
</style>
