<script setup lang="ts">
import {
    ProTable,
    type ProTableColumnType
} from '@jc/element-plus-pro-components'
import { ElButton, ElMessage } from 'element-plus'
import { h, ref } from 'vue'
import type { OperationColumnConfig } from '@jc/element-plus-pro-components'

const tableColumns: ProTableColumnType[] = [
    {
        label: '风格',
        prop: 'style',
        width: 100,

        cell: {
            cellType: 'enum',
            // 枚举值
            // valueEnum: {
            //     dew: { text: '清新', type: 'danger', size: 'small' }
            // },
            // 自定义组件
            render: (row) => {
                return h('span', { style: { color: 'red' } }, row.username)
            }
        }
    },
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
        width: 100
    },
    {
        label: '头像',
        prop: 'avatar',
        width: 100,
        cell: {
            cellType: 'image',
            width: 50,
            height: 50
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
    {
        label: 'HP',
        prop: 'hp',
        // cell: { cellType: 'progress' },
        width: 200,
        cell: {
            render: (row) => {
                return h('span', { style: { color: 'red' } }, 'HP')
            }
        }
    },
    { label: '状态', prop: 'status', cell: 'switch' },
    { label: '电话', prop: 'phone', width: 150 },
    { label: '描述', prop: 'desc', cell: 'input', width: 200 },
    {
        label: '职业',
        prop: 'job',
        width: 120,
        cell: {
            cellType: 'txt',
            isCopy: true
            // formatValue(value, row) {
            //     return value
            // }
        }
    },
    { label: '邮箱', prop: 'email' },
    { label: '生日', prop: 'birthday' }
]

const tableData = ref([
    {
        id: '7843d5c8-168c-4a25-98b1-eded534625fb',
        username: '祢秀英',
        age: 16,
        address: '华北',
        phone: '079-23833489',
        desc: '脊梁爱好者',
        job: '高级基础设施助理',
        email: 'mzitue35@sina.com',
        status: true,
        hp: 50,
        style: 'dew',
        birthday: '1968-01-10 02:35:13',
        avatar: 'https://avatars.githubusercontent.com/u/66599180'
    },
    {
        id: 'f1af54cc-f1ce-4f42-80b4-20995227e762',
        username: '缪玉珍',
        age: 22,
        address: '华南',
        phone: '0018-66740163',
        desc: '教练，老师，艺术家🤜',
        job: '投资者研究主任',
        email: 'fvpts4_i3b97@foxmail.com',
        birthday: '1963-07-05 11:26:08',
        avatar: 'https://avatars.githubusercontent.com/u/87759762'
    },
    {
        id: '60ac2be1-3a1a-426e-aee1-1acf7684a3be',
        username: '邹刚',
        age: 53,
        address: '东北',
        phone: '15148050772',
        desc: '鳄鱼发烧友，旅行家🔑',
        job: '动态解决方案统筹',
        email: 'feog2w.kce@gmail.com',
        birthday: '1986-06-01 07:01:41',
        avatar: 'https://avatars.githubusercontent.com/u/59082084'
    },
    {
        id: '48f82e70-fbe6-4775-bc0d-e77fd9dec0f6',
        username: '狄天娇',
        age: 93,
        address: '西南',
        phone: '10774006579',
        desc: '帽子爱好者',
        job: '高级安全分析师',
        email: 'k1zsbt_uws54@tom.com',
        birthday: '1993-05-21 18:52:43',
        avatar: 'https://avatars.githubusercontent.com/u/83772913'
    },
    {
        id: '20a950c6-7dc3-4ce9-b719-6dd481cc4df4',
        username: '贝哲新',
        age: 25,
        address: '华东',
        phone: '0069-35140360',
        desc: '秋海棠贡献者',
        job: '投资者指令工程师',
        email: 'k5q.ggj34@sina.com',
        birthday: '1957-05-13 06:39:54',
        avatar: 'https://avatars.githubusercontent.com/u/90238676'
    },
    {
        id: 'b8aa2738-c2d9-44a8-811a-b2201dcbc3b4',
        username: '仵瑜',
        age: 98,
        address: '华南',
        phone: '12497995199',
        desc: '出价贡献者🏵️',
        job: '内部优化技术员',
        email: 'vacsbt.ryi55@tom.com',
        birthday: '2002-12-09 00:50:16',
        avatar: 'https://avatars.githubusercontent.com/u/89885243'
    },
    {
        id: 'cc6ee854-be4d-411b-888b-2561c1e6bebf',
        username: '锺伟',
        age: 31,
        address: '华中',
        phone: '0211-11162555',
        desc: '羚羊支持者，艺术家',
        job: '区域性互动经理',
        email: 'k1zsbt98@vip.qq.com',
        birthday: '1995-03-23 19:31:06',
        avatar: 'https://avatars.githubusercontent.com/u/77903442'
    },
    {
        id: 'd19cf9ab-3a43-473b-a024-de6f0295bedf',
        username: '书奕泽',
        age: 58,
        address: '西北',
        phone: '013-80377692',
        desc: '油门支持者🇹🇷',
        job: '全球部门策略师',
        email: 'k5qscp0@hotmail.com',
        birthday: '1984-12-29 03:54:31',
        avatar: 'https://avatars.githubusercontent.com/u/22099717'
    },
    {
        id: 'bcdea033-ccdc-4599-8245-8d8ef17b9bdb',
        username: '居宇',
        age: 12,
        address: '华北',
        phone: '0067-59010991',
        desc: '飞行员支持者，退伍军人',
        job: '区域性项目主任',
        email: 'vacsbt97@21cn.com',
        birthday: '1997-06-14 12:04:53',
        avatar: 'https://avatars.githubusercontent.com/u/98363634'
    },
    {
        id: '6d10a572-616d-474f-8c2a-47a4d0ec2b69',
        username: '周丽芬',
        age: 26,
        address: '西南',
        phone: '16025650351',
        desc: '肾上腺素贡献者',
        job: '遗留身份统筹',
        email: 'ui845@yahoo.cn',
        birthday: '2006-07-02 22:02:31',
        avatar: 'https://avatars.githubusercontent.com/u/85254802'
    },
    {
        id: 'e0aeb2a6-7e31-4a5c-86b7-bd1d7f66560c',
        username: '邸立伟',
        age: 87,
        address: '华东',
        phone: '040-63371636',
        desc: '改编贡献者🕷️',
        job: '客户运营开发员',
        email: 'gs2m56.lal82@126.com',
        birthday: '1979-12-19 00:13:08',
        avatar: 'https://avatars.githubusercontent.com/u/61946194'
    },
    {
        id: 'fffbab51-6d7d-4a82-9355-16d27407c744',
        username: '沙敬彪',
        age: 75,
        address: '西北',
        phone: '0572-52973857',
        desc: '毕业生，极客',
        job: '公司基础设施主管',
        email: 'k1zk5m.i6h@126.com',
        birthday: '1978-07-07 01:14:24',
        avatar: 'https://avatars.githubusercontent.com/u/25592749'
    },
    {
        id: 'd90933b6-b9bb-4013-9eb2-c9ddf695ce17',
        username: '延静怡',
        age: 31,
        address: '华东',
        phone: '0492-74700875',
        desc: '附属粉丝🆓',
        job: '人力优化策划师',
        email: 'ob5j6i_lio9@tom.com',
        birthday: '1995-08-02 03:31:19',
        avatar: 'https://avatars.githubusercontent.com/u/91825069'
    },
    {
        id: '2f7aa46e-c3b4-4f81-a780-697dbf38e9dc',
        username: '逯安琪',
        age: 23,
        address: '西北',
        phone: '17123028250',
        desc: '意识倡导者，设计师',
        job: '区域性运营主管',
        email: 'k8qscp24@163.com',
        birthday: '2007-04-08 10:05:28',
        avatar: 'https://avatars.githubusercontent.com/u/58683945'
    },
    {
        id: 'b907c5c5-98a2-4fca-8fe3-5d6eb8dc0d61',
        username: '戏中海',
        age: 68,
        address: '东北',
        phone: '15583562168',
        desc: '书架倡导者',
        job: '区域性品牌建设助理',
        email: 'ixjlj1_jew@139.com',
        birthday: '1970-04-17 03:28:15',
        avatar: 'https://avatars.githubusercontent.com/u/30445381'
    },
    {
        id: '474da83e-eb0b-4664-9a6d-c94c730f940d',
        username: '羽榕融',
        age: 29,
        address: '西北',
        phone: '0310-60062311',
        desc: '教育家，毕业生',
        job: '高级应用程序工程师',
        email: 'k7znlr.i337@yahoo.com.cn',
        birthday: '1980-03-12 11:08:51',
        avatar: 'https://avatars.githubusercontent.com/u/79959978'
    },
    {
        id: '1453c0c1-13fe-47af-a62d-8d6123d4da60',
        username: '寻婷',
        age: 69,
        address: '西南',
        phone: '0871-01184400',
        desc: '企业主，摄影爱好者',
        job: '前进指令经理',
        email: 'valljf.fqg@126.com',
        birthday: '1960-09-27 20:44:41',
        avatar: 'https://avatars.githubusercontent.com/u/97666123'
    },
    {
        id: '684d3126-7666-45d0-9a09-1abdd7b191fb',
        username: '宣磊',
        age: 43,
        address: '华中',
        phone: '007-13132944',
        desc: '男中音贡献者😚',
        job: '客户网络设计师',
        email: 'i1clo580@21cn.com',
        birthday: '1945-09-24 22:13:52',
        avatar: 'https://avatars.githubusercontent.com/u/4920409'
    },
    {
        id: '0aeee828-73b6-4b63-b785-23a0b5b24651',
        username: '饶志明',
        age: 58,
        address: '华南',
        phone: '067-40507925',
        desc: '驳船爱好者',
        job: '产品应用程序技术员',
        email: 'pd6fvp57@gmail.com',
        birthday: '1968-04-25 00:44:09',
        avatar: 'https://avatars.githubusercontent.com/u/36183029'
    },
    {
        id: '99f7ceda-155a-4a3e-bd7c-d4e4e6b1b72d',
        username: '师宇轩',
        age: 93,
        address: '华东',
        phone: '060-70392599',
        desc: '设计师，退伍军人，父母',
        job: '内部身份开发员',
        email: 'l7nrqi96@sohu.com',
        birthday: '1948-03-27 19:28:58',
        avatar: 'https://avatars.githubusercontent.com/u/46226754'
    },
    {
        id: 'e6c2abe3-23b2-4fb6-931b-c3ec879e2c5f',
        username: '元乙萍',
        age: 71,
        address: '华中',
        phone: '13698002913',
        desc: '玩家',
        job: '中央市场营销主管',
        email: 'negtue_nrp@qq.com',
        birthday: '1993-11-27 06:49:46',
        avatar: 'https://avatars.githubusercontent.com/u/92661502'
    },
    {
        id: '7f808469-bbc3-43ac-892b-a682d8fab433',
        username: '玉浩然',
        age: 38,
        address: '西南',
        phone: '13133641857',
        desc: '设备粉丝，个人⛱️',
        job: '产品质量主任',
        email: 'k1zu0c.ptd4@126.com',
        birthday: '2005-12-16 06:49:50',
        avatar: 'https://avatars.githubusercontent.com/u/95819752'
    },
    {
        id: '73f70f89-0a0b-4265-99c2-d4143f1d7394',
        username: '刁国芳',
        age: 26,
        address: '西北',
        phone: '0076-09013345',
        desc: '弯曲狂热者，极客🫐',
        job: '主管移动性助理',
        email: 'mawgge4@vip.qq.com',
        birthday: '1984-11-20 19:51:46',
        avatar: 'https://avatars.githubusercontent.com/u/92757685'
    },
    {
        id: '4618a8c5-aa75-437b-8072-fc6bd8bd35fd',
        username: '郦浩然',
        age: 97,
        address: '华中',
        phone: '078-09490980',
        desc: '父母，企业主',
        job: '国际移动性分析师',
        email: 'hvbk3d.rvh@gmail.com',
        birthday: '1970-04-28 18:37:08',
        avatar: 'https://avatars.githubusercontent.com/u/39998874'
    },
    {
        id: 'cafde2fb-a575-43d4-a1a8-b6e1b32bb1d9',
        username: '廖超栋',
        age: 51,
        address: '华东',
        phone: '081-40139556',
        desc: '浴袍爱好者👨‍👩‍👧',
        job: '高级账户助理',
        email: 'i8lv9r.skb23@163.com',
        birthday: '1966-01-23 05:13:25',
        avatar: 'https://avatars.githubusercontent.com/u/10105934'
    },
    {
        id: 'e9c1589c-945d-4ad6-ad88-c01781489170',
        username: '苟珈',
        age: 49,
        address: '西北',
        phone: '078-10341252',
        desc: '飞机贡献者',
        job: '产品反应策略师',
        email: 'kutqrx65@foxmail.com',
        birthday: '1980-11-24 11:08:59',
        avatar: 'https://avatars.githubusercontent.com/u/72269728'
    },
    {
        id: 'd002a9b6-1c46-4f3c-b5db-76d8765cde86',
        username: '魏榕融',
        age: 78,
        address: '华中',
        phone: '0904-54098970',
        desc: '哲学家，活动家，活动家',
        job: '直接网络助理',
        email: 'rmftt484@yahoo.cn',
        birthday: '1952-08-20 02:34:35',
        avatar: 'https://avatars.githubusercontent.com/u/9333757'
    }
])

const operateionColumn: OperationColumnConfig = {
    btnProps: {
        hideBtns: [false, false, false]
    }
}

const requestApiConfig = {
    get: () => Promise.resolve(tableData)
}

const handleAgeHeader = () => {
    ElMessage.success('点击了年龄-表头插槽渲染')
}

const handleCellChange = (row: any, column: any, newValue: any) => {
    console.log('newValue', newValue)
}
</script>

<template>
    <div class="container">
        <div class="table-area">
            <ProTable
                :request-api-config="requestApiConfig"
                :table-data="tableData"
                align="center"
                :table-columns="tableColumns"
                :operation-column="operateionColumn"
                @cell-change="handleCellChange"
            >
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
    padding-top: 70px;
    width: 800px;
    height: 100vh;
    background-color: #ccc;
    border: 1px solid #000;
    .table-area {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
}
</style>
