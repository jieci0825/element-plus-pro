<script setup lang="ts">
import { proFormProps } from './form'

defineOptions({
    name: 'ProForm'
})

const props = defineProps(proFormProps)
</script>

<template>
    <h1>我是 pro form | {{ props.message }}</h1>
    <div>
        <input placeholder="请输入..." />
    </div>
</template>

<style scoped lang="scss"></style>
