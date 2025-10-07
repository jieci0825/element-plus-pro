<script setup lang="ts">
import {
    ProTable,
    type ProTableColumnType
} from '@jc/element-plus-pro-components'
import { ElButton, ElMessage } from 'element-plus'
import { h, ref } from 'vue'
import type { OperationColumnConfig } from '@jc/element-plus-pro-components'

const tableColumns: ProTableColumnType[] = [
    // {
    //     label: '风格',
    //     prop: 'style',
    //     width: 100,

    //     cell: {
    //         cellType: 'enum',
    //         // 枚举值
    //         // valueEnum: {
    //         //     dew: { text: '清新', type: 'danger', size: 'small' }
    //         // },
    //         // 自定义组件
    //         render: (row) => {
    //             return h('span', { style: { color: 'red' } }, row.username)
    //         }
    //     }
    // },
    {
        label: {
            render: () =>
                h(
                    ElButton,
                    {
                        type: 'primary',
                        size: 'small',
                        onClick: () => {
                            ElMessage.success('点击了自定义渲染函数表头')
                        }
                    },
                    () => '用户名'
                )
        },
        prop: 'username',
        width: 100,
        search: {
            label: '用户名',
            type: 'input',
            placeholder: '请输入用户名查询'
        }
    },
    {
        label: '头像',
        prop: 'avatar',
        width: 100,
        cell: {
            cellType: 'image',
            width: 50,
            height: 50,
            isCircle: true
        }
    },
    {
        label: { slot: 'age' },
        prop: 'age',
        width: 120,
        cell: {
            cellType: 'input_number',
            min: 0,
            max: 100,
            step: 1,
            size: 'small'
            // slot: 'ageCell'
        }
    },
    {
        label: '地址',
        prop: 'address',
        width: 120,
        // formatter(row) {
        //     console.log(row)
        //     return 'formatter'
        // },
        cell: {
            cellType: 'select',
            options: [
                { label: '华北', value: '华北' },
                { label: '华南', value: '华南' },
                { label: '西南', value: '西南' },
                { label: '东北', value: '东北' }
            ]
        }
    },
    // {
    //     label: 'HP',
    //     prop: 'hp',
    //     // cell: { cellType: 'progress' },
    //     width: 200,
    //     cell: {
    //         render: (row) => {
    //             return h('span', { style: { color: 'red' } }, 'HP')
    //         }
    //     }
    // },
    { label: '状态', prop: 'status', cell: 'switch' },
    {
        label: '电话',
        prop: 'phone',
        width: 150,
        search: { type: 'input', placeholder: '请输入电话查询' }
    },
    { label: '描述', prop: 'desc', cell: 'input', width: 200 },
    {
        label: '职业',
        prop: 'job',
        width: 120,
        search: { type: 'input', placeholder: '请输入职业查询' },
        cell: {
            cellType: 'txt',
            isCopy: true
            // formatValue(value, row) {
            //     return value
            // }
        }
    },
    { label: '邮箱', prop: 'email' },
    {
        label: '生日',
        prop: 'birthday',
        search: {
            type: 'daterange',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间'
        }
    }
]

const getUserList = async (params: any) => {
    // 将params转为query参数
    const query = new URLSearchParams(params).toString()

    const resp = await fetch(`http://127.0.0.1:3003/api/epp/users?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await resp.json()
}

const getTableData = async (params: any) => {
    // 如果需要对请求参数进行处理，则在这里处理

    return getUserList(params)
}

const operateionColumn: OperationColumnConfig = {
    btnConfig: {
        isTextBtn: false,
        viewBtn: true,
        editBtn: true,
        deleteBtn: true
    }
}

const handleAgeHeader = () => {
    ElMessage.success('点击了年龄-表头插槽渲染')
}

const handleCellChange = (row: any, column: any, newValue: any) => {
    console.log('newValue', newValue)
}

const headerClick = () => {
    console.log('表头被点击了')
}
</script>

<template>
    <div class="container">
        <div class="table-area">
            <ProTable
                border
                align="center"
                title="用户列表"
                component-style="card"
                :request-api="getTableData"
                :table-columns="tableColumns"
                :operation-column="operateionColumn"
                :init-params="{ username: '' }"
                :selection="true"
                @header-click="headerClick"
                @cell-change="handleCellChange"
            >
                <template #tableHeader>
                    <el-button type="primary">新增</el-button>
                </template>
                <template #empty>
                    <el-empty description="空数据"></el-empty>
                </template>
                <template #age>
                    <el-tag type="success" @click="handleAgeHeader"
                        >年龄</el-tag
                    >
                </template>
                <template #ageCell="{ slotProps }">
                    <span style="color: orange; font-weight: bold">{{
                        slotProps.row.age
                    }}</span>
                </template>
            </ProTable>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 95vw;
    height: 100vh;
    margin: 0 auto;
    background-color: #ccc;
    border: 1px solid #000;
    .table-area {
        width: 100%;
        height: 100%;
        background-color: #f2f3f5;
        padding: 20px;
    }
}
</style>
