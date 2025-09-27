<script setup lang="ts">
import ProForm from '../../../form'
import { ref, computed, inject } from 'vue'
import { tableContextKey } from '../constants'
import { isObject } from '@jc/element-plus-pro-utils'
import {
    Search,
    RefreshLeft,
    ArrowDown,
    ArrowUp
} from '@element-plus/icons-vue'
import './search.scss'

const tabelContextInject = inject(tableContextKey)

// 提取需要列配置
const tableColumns = computed(() => {
    return (
        tabelContextInject?.tableColumns.filter((item) =>
            isObject(item.search)
        ) || []
    )
})

const searchFormItems = computed<any[]>(() => {
    return tableColumns.value.map((item) => {
        return {
            ...item.search,
            key: item.prop,
            label: item?.search?.label ?? item.label
        }
    })
})

const model = ref({})

// function tableColumns2Model() {
//     tableColumns.value.forEach((item) => {
//         // TODO 默认值可以让外部传入一个对象，然后使用这个对象的默认值
//         model.value[item.prop] = ''
//     })
// }
// tableColumns2Model()

const getProFormProps = () => {
    const defaultProFormProps = {
        formItems: searchFormItems.value,
        inline: true,
        labelWidth: 'auto'
        // col: { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 },
    }

    return defaultProFormProps
}

// daterange datetimerange 这两个占据两列
</script>

<template>
    <div class="pro-table__search--inner">
        <ProForm v-model="model" v-bind="getProFormProps()">
            <template #footer>
                <div class="footer-wrap">
                    <el-button :icon="RefreshLeft">重置</el-button>
                    <el-button type="primary" :icon="Search">搜索</el-button>
                    <el-link type="primary" :underline="false">
                        展开<el-icon size="18"><ArrowDown /></el-icon>
                    </el-link>
                </div>
            </template>
        </ProForm>
    </div>
</template>
