<script setup lang="ts">
import { ProDrawer } from '@jc/element-plus-pro-components'
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
        <el-button @click="handleOpen" type="primary">打开</el-button>
        <ProDrawer v-model="visible">
            <template #header>
                <h3>自定义标题</h3>
            </template>
            <template #default>
                <div>内容区域，将会在每次关闭后销毁</div>
                <input type="text" v-model="inputValue" />
            </template>
            <template #footer>
                <el-button @click="handleClose">关闭</el-button>
            </template>
        </ProDrawer>
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
</style>
