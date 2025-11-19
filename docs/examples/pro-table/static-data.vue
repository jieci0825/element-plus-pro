<script setup lang="ts">
import { mockUserList } from './data.js'
import type { ProTableColumnType } from '@coderjc/element-plus-pro'

// 静态数据，取前 5 条
const tableData = mockUserList.slice(0, 5)

const columns: ProTableColumnType[] = [
    { prop: 'username', label: '用户名' },
    { prop: 'age', label: '年龄', width: 80 },
    { prop: 'phone', label: '手机号', width: 150 },
    { prop: 'email', label: '邮箱', width: 200 },
    { prop: 'address', label: '地址' },
    { prop: 'job', label: '职业' }
]
</script>

<template>
    <div class="demo-container">
        <ProTable
            :data="tableData"
            :table-columns="columns"
            :pagination="false"
        />
    </div>
</template>

<style scoped lang="scss">
.demo-container {
    width: 100%;
}
</style>
