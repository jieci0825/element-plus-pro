<script setup lang="ts">
import { getUserList } from './data.js'
import type { ProTableColumnType } from '@coderjc/element-plus-pro'

const columns: ProTableColumnType[] = [
    {
        prop: 'username',
        label: '用户名',
        search: { type: 'input' }
    },
    {
        prop: 'age',
        label: '年龄',
        width: 80
    },
    {
        prop: 'phone',
        label: '手机号',
        width: 150
    },
    {
        prop: 'email',
        label: '邮箱',
        width: 200
    },
    {
        prop: 'address',
        label: '地址',
        search: {
            type: 'select',
            options: [
                { label: '东北', value: '东北' },
                { label: '华北', value: '华北' },
                { label: '华中', value: '华中' },
                { label: '西北', value: '西北' },
                { label: '西南', value: '西南' }
            ]
        }
    }
]
</script>

<template>
    <div class="demo-container">
        <ProTable :request-api="getUserList" :table-columns="columns" />
    </div>
</template>

<style scoped lang="scss">
.demo-container {
    width: 100%;
    height: 700px;
}
</style>
