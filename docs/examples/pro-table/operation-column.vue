<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { getUserList } from './data.js'
import type {
    ProTableColumnType,
    OperationColumnConfig
} from '@coderjc/element-plus-pro'

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

const operationColumn: OperationColumnConfig = {
    // 也支持自定义表头
    label: {
        render: () => '预设操作列'
    },
    fixed: 'right',
    btnConfig: {
        isTextBtn: false,
        viewBtn: true,
        editBtn: {
            plain: true,
            disabled: false,
            onClick: (row) => {
                ElMessage.success('点击了编辑' + row.username)
            }
        },
        deleteBtn: {
            onClick: (row) => {
                ElMessage.error('点击了删除' + row.username)
            }
        },
        // 同事显示图标和文本
        displayMode: 'icon-text',
        plain: false
    }
}
</script>

<template>
    <div class="container">
        <ProTable
            :request-api="getUserList"
            :table-columns="columns"
            :operation-column="operationColumn"
        />
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 700px;
}
</style>
