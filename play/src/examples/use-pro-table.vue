<script setup lang="ts">
import {
    ProTable,
    type ProTableColumnType
} from '@coderjc/element-plus-pro-components'
import { ElButton, ElMessage } from 'element-plus'
import { h, ref } from 'vue'
import type { OperationColumnConfig } from '@coderjc/element-plus-pro-components'

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
        },
        cell: {
            slot: 'usernameCell',
            render: (row) => {
                return h(
                    'a',
                    { href: 'https://www.baidu.com' },
                    '百度' + row.username
                )
            }
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
    { label: '状态', prop: 'status', cell: 'switch' },
    {
        label: '其他信息',
        minWidth: 300,
        // 如果配置 search 属性则必须配置 prop
        children: [
            {
                label: { slot: 'age' },
                prop: 'age',
                width: 120,
                cell: {
                    // cellType: 'input_number',
                    // min: 0,
                    // max: 100,
                    // step: 1,
                    // size: 'small'
                    slot: 'ageCell'
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
                },
                search: {
                    type: 'input',
                    placeholder: '请输入地址查询'
                }
            },
            {
                label: '电话',
                prop: 'phone',
                width: 150,
                search: { type: 'input', placeholder: '请输入电话查询' }
            },
            {
                label: '生日',
                prop: 'birthday',
                search: {
                    type: 'daterange',
                    startPlaceholder: '开始时间',
                    endPlaceholder: '结束时间'
                }
            },
            { label: '邮箱', prop: 'email' }
        ]
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
    }
]

// const tableColumns: any[] = [
//     {
//         label: '基本信息',
//         // prop: 'basicInfo',
//         // search: {
//         //     type: 'input'
//         // },
//         children: [
//             {
//                 label: '姓名',
//                 prop: 'name',
//                 width: 120,
//                 search: {
//                     label: '用户名',
//                     type: 'input',
//                     placeholder: '请输入姓名查询'
//                 }
//             },
//             {
//                 label: '年龄',
//                 prop: 'age',
//                 width: 80,
//                 search: {
//                     type: 'input'
//                 }
//             }
//         ]
//     },
//     {
//         label: '联系方式',
//         children: [
//             {
//                 label: '电话',
//                 prop: 'phone',
//                 width: 150
//             },
//             {
//                 label: '地址信息',
//                 children: [
//                     {
//                         label: '省份',
//                         prop: 'province',
//                         width: 100
//                     },
//                     {
//                         label: '城市',
//                         prop: 'city',
//                         width: 100
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         label: '工作信息',
//         children: [
//             {
//                 label: '公司',
//                 prop: 'company',
//                 width: 150
//             },
//             {
//                 label: '职位',
//                 prop: 'position',
//                 width: 120,
//                 search: {
//                     type: 'input',
//                     placeholder: '请输入职位查询'
//                 }
//             },
//             {
//                 label: '薪资范围',
//                 children: [
//                     {
//                         label: '最低',
//                         prop: 'minSalary',
//                         width: 100
//                     },
//                     {
//                         label: '最高',
//                         prop: 'maxSalary',
//                         width: 100
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         label: '备注',
//         prop: 'remark',
//         width: 200
//     }
// ]

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

const handleSearch = (params: any) => {
    console.log('params', params)
}

// ========== 静态数据示例 ==========
const staticTableColumns: ProTableColumnType[] = [
    { label: 'ID', prop: 'id', width: 80 },
    {
        label: '姓名',
        prop: 'username',
        width: 120,
        search: {
            type: 'input',
            placeholder: '请输入姓名查询'
        }
    },
    { label: '年龄', prop: 'age', width: 100 },
    { label: '城市', prop: 'address', width: 120 },
    { label: '职位', prop: 'job', width: 150 }
]

// 静态数据（模拟数据用于测试）
const staticData = ref([
    {
        id: '9191844e-956d-434f-9bbf-253bdc67f292',
        username: '化国英',
        age: 21,
        address: '东北',
        phone: '10555775065',
        desc: '钟发烧友，教练🥗',
        job: '公司项目分析师',
        email: 'freg6n_kic@qq.com',
        birthday: '1966-01-09 05:54:56',
        avatar: 'https://avatars.githubusercontent.com/u/33738549'
    },
    {
        id: '52191bc0-a169-4b83-ba3b-deed8e4b9e33',
        username: '敏秀英',
        age: 51,
        address: '东北',
        phone: '0038-32831413',
        desc: '背焚发烧友，电影制片人',
        job: '主管质量制作人',
        email: 'jwupu5.smn@yahoo.cn',
        birthday: '1995-05-12 07:21:50',
        avatar: 'https://avatars.githubusercontent.com/u/5068070'
    },
    {
        id: '4fb8c5ba-f9e5-40fd-9179-7dcd10137f67',
        username: '肥苡沫',
        age: 67,
        address: '华中',
        phone: '15396263370',
        desc: '后果贡献者，爱国者',
        job: '全球品牌建设分析师',
        email: 'gs2m56.fh8@qq.com',
        birthday: '1953-07-30 10:26:45',
        avatar: 'https://avatars.githubusercontent.com/u/10270596'
    },
    {
        id: 'f04249e0-4d70-4bfb-ad96-968d70342e34',
        username: '介梓浩',
        age: 61,
        address: '东北',
        phone: '0334-01409477',
        desc: '吸引力爱好者',
        job: '全国性质量策略师',
        email: 'n0emzg_frz23@qq.com',
        birthday: '2006-06-22 02:49:08',
        avatar: 'https://avatars.githubusercontent.com/u/81248465'
    },
    {
        id: '627eb7ff-7aae-40d5-bfae-796c1de9cc37',
        username: '储梓诚',
        age: 81,
        address: '西北',
        phone: '0285-42365361',
        desc: '帽子粉丝，摄影爱好者🧃',
        job: '客户项目分析师',
        email: 'k5qsbt.liv92@yahoo.cn',
        birthday: '1953-04-04 15:48:55',
        avatar: 'https://avatars.githubusercontent.com/u/66586900'
    },
    {
        id: 'b7a0b515-6915-40c6-a07c-5aea74adfd99',
        username: '舒浩辰',
        age: 42,
        address: '东北',
        phone: '10623459264',
        desc: '教育家，脑力爱好者，创造者🐕‍🦺',
        job: '高级问责制策划师',
        email: 'lmfmhh95@139.com',
        birthday: '1974-09-14 12:37:57',
        avatar: 'https://avatars.githubusercontent.com/u/84301252'
    },
    {
        id: '783d78f3-3432-4c2f-9899-cb3b152da2c5',
        username: '官欣怡',
        age: 84,
        address: '华北',
        phone: '12713418501',
        desc: '公众演说家，退伍军人，环保主义者👂🏻',
        job: '直接基础设施助理',
        email: 'ggqryd28@21cn.com',
        birthday: '1962-08-21 13:19:20',
        avatar: 'https://avatars.githubusercontent.com/u/72487355'
    },
    {
        id: '93cbcdee-6dae-4b3f-aaa5-21f83b4d3c86',
        username: '智建华',
        age: 22,
        address: '西南',
        phone: '0029-90698030',
        desc: '发明家',
        job: '未来研究代表',
        email: 'tbfv9r.fgw11@qq.com',
        birthday: '2002-02-11 14:31:56',
        avatar: 'https://avatars.githubusercontent.com/u/75792992'
    },
    {
        id: '509cec01-248e-4ffb-b593-82d1d2f383a9',
        username: '靳万佳',
        age: 62,
        address: '东北',
        phone: '15102249800',
        desc: '个人，企业家，创始人🏚️',
        job: '全球应用程序设计师',
        email: 'lm1sds.slz7@126.com',
        birthday: '2005-04-15 14:53:42',
        avatar: 'https://avatars.githubusercontent.com/u/23237507'
    },
    {
        id: 'fe4fc0a3-7d58-44ee-b3bf-d6338cb889b1',
        username: '俞国英',
        age: 87,
        address: '东北',
        phone: '0179-66423495',
        desc: '客机支持者，旅行家🥍',
        job: '人力解决方案管理员',
        email: 'k8qlqi_idj16@139.com',
        birthday: '1961-12-19 03:08:43',
        avatar: 'https://avatars.githubusercontent.com/u/60940632'
    },
    {
        id: '1d19062a-3d02-47c2-86d1-0e4e7b8d79e1',
        username: '淦建国',
        age: 40,
        address: '西南',
        phone: '052-94400690',
        desc: '账户狂热者，毕业生',
        job: '直接反应协调员',
        email: 'lnf.m10@yeah.net',
        birthday: '1978-07-14 17:11:59',
        avatar: 'https://avatars.githubusercontent.com/u/96505813'
    }
])

const showStaticMode = ref(true)

const toggleMode = () => {
    showStaticMode.value = !showStaticMode.value
    ElMessage.success(
        `已切换到${showStaticMode.value ? '静态数据' : '请求'}模式`
    )
}
</script>

<template>
    <div class="container">
        <div class="mode-switch">
            <el-button type="primary" @click="toggleMode">
                切换到{{ showStaticMode ? '请求' : '静态数据' }}模式
            </el-button>
        </div>

        <!-- 静态数据模式 -->
        <div class="table-area" v-if="showStaticMode">
            <ProTable
                border
                align="center"
                title="静态数据表格"
                :data="staticData"
                :table-columns="staticTableColumns"
                :pagination="true"
                :selection="true"
            >
                <template #tableHeader>
                    <el-button type="primary" @click=""> 添加数据 </el-button>
                </template>
            </ProTable>
        </div>

        <!-- 请求模式 -->
        <div class="table-area" v-else>
            <ProTable
                border
                align="center"
                title="用户列表"
                :request-api="getTableData"
                :table-columns="tableColumns"
                :operation-column="operateionColumn"
                :init-params="{ username: '' }"
                :selection="true"
                element-loading-text="coderjc"
                @search="handleSearch"
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
                <template #ageCell="{ row }">
                    <span style="color: orange; font-weight: bold">{{
                        row.age
                    }}</span>
                </template>
                <template #usernameCell>111</template>
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
    display: flex;
    flex-direction: column;

    .mode-switch {
        padding: 20px;
        background-color: #f2f3f5;
        border-bottom: 1px solid #dcdfe6;
        text-align: center;
    }

    .table-area {
        flex: 1;
        overflow: auto;
        background-color: #f2f3f5;
        padding: 20px;
    }
}
</style>
