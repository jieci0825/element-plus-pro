<script setup lang="ts">
import { h } from 'vue'
import { mockUserList } from './data.js'
import { ElTag } from 'element-plus'
import type { ProTableColumnType } from '@coderjc/element-plus-pro'

// 静态数据，取前 5 条
const tableData = mockUserList.slice(0, 5)

const columns: ProTableColumnType[] = [
    {
        prop: 'avatar',
        label: '头像',
        width: 100,
        cell: {
            cellType: 'image',
            width: 40,
            height: 40,
            isCircle: true
        }
    },
    {
        prop: 'username',
        label: '用户名',
        cell: {
            cellType: 'txt',
            isCopy: true
        }
    },
    {
        prop: 'age',
        label: '年龄',
        width: 100,
        cell: {
            cellType: 'input_number',
            min: 1,
            max: 120,
            step: 1,
            size: 'small'
        }
    },
    {
        prop: 'status',
        label: '状态',
        width: 100,
        cell: {
            cellType: 'switch'
        }
    },
    {
        prop: 'address',
        label: '地址',
        width: 120,
        cell: {
            cellType: 'select',
            options: [
                { label: '东北', value: '东北' },
                { label: '华北', value: '华北' },
                { label: '华中', value: '华中' },
                { label: '西北', value: '西北' },
                { label: '西南', value: '西南' }
            ]
        }
    },
    {
        prop: 'desc',
        label: '描述（插槽）',
        width: 150,
        cell: {
            slot: 'desc'
        }
    },
    {
        prop: 'job',
        label: '职业（render）',
        width: 160,
        cell: {
            render: (row) => h(ElTag, { type: 'success' }, () => row.job)
        }
    }
]
</script>

<template>
    <div class="container">
        <ProTable
            component-style=""
            :data="tableData"
            :table-columns="columns"
            :pagination="false"
            :show-header="false"
        >
            <!-- 自定义插槽渲染 -->
            <template #desc="{ row }">
                <span style="color: red">
                    {{ row.desc }}
                </span>
            </template>
        </ProTable>
    </div>
</template>
