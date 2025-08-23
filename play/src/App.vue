<script setup lang="ts">
import { ProForm, ProFormItemType } from '@jc/element-plus-pro-components'
import { ref } from 'vue'

const formItems: ProFormItemType[] = [
    {
        label: '姓名',
        key: 'name',
        type: 'input'
    }
]

const form = ref({})
</script>

<template>
    <ProForm :form-items="formItems" v-model="form" />
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
