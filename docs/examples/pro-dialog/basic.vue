<script setup lang="ts">
import { ProDialog } from '@coderjc/element-plus-pro'
import { ref } from 'vue'

const visible = ref(false)

const handleOpen = () => {
    visible.value = true
}
const handleClose = () => {
    visible.value = false
}

const inputValue = ref('')
</script>

<template>
    <div class="container">
        <el-button :fullscreen="false" @click="handleOpen" type="primary"
            >打开</el-button
        >
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
    width: 400px;
}
</style>
