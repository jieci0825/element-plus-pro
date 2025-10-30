<script setup lang="ts">
import { h } from 'vue'
import { mockUserList } from './data.js'
import { ElIcon, ElTag } from 'element-plus'
import { Briefcase } from '@element-plus/icons-vue'
import type { ProTableColumnType } from '@coderjc/element-plus-pro'

// 静态数据，取前 5 条
const tableData = mockUserList.slice(0, 5)

const columns: ProTableColumnType[] = [
    {
        prop: 'username',
        label: {
            // 使用 render 函数自定义表头
            render: () => h(ElTag, { type: 'success' }, () => '用户名')
        }
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
        prop: 'address',
        label: '地址',
        width: 80
    },
    {
        prop: 'job',
        label: {
            // 使用插槽自定义表头
            slot: 'jobHeader'
        }
    }
]
</script>

<template>
    <div class="container">
        <ProTable
            :data="tableData"
            :table-columns="columns"
            :pagination="false"
        >
            <!-- 自定义表头插槽 -->
            <template #jobHeader>
                <el-icon><Briefcase /></el-icon>
                <span style="margin-left: 4px; color: red">职业信息</span>
            </template>
        </ProTable>
    </div>
</template>
