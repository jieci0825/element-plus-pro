<script setup lang="ts">
import TableData from './table-data.vue'
import { ProTableSearch } from './search'
import { proTableEmits, proTableProps } from './table'
import { computed, provide, useAttrs, ref } from 'vue'
import {
    generateOperationColumnConfig,
    processColumnConfig
} from './process-column-config'
import './table.scss'
import { tableContextKey } from './constants'
import { isObject } from '@jc/element-plus-pro-utils'
import { useHeader } from './hooks'

defineOptions({
    name: 'ProTable'
})

const attrs = useAttrs()
const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const [originTableColumnConfig] = processColumnConfig(props)

const operationColumnConfig = computed(() => {
    return generateOperationColumnConfig(props)
})

const onCellChange = (
    row: Record<string, any>,
    prop: string | number,
    newValue: any
) => {
    const column = originTableColumnConfig.find((item) => item.prop === prop)
    emit('cellChange', row, column!, newValue)
}

const componentStyleClass = computed(() => {
    if (props.componentStyle === 'card') {
        return 'is-card'
    }
    return ''
})

const showSearch = computed(() => {
    // 如果有搜索列配置，则显示搜索栏
    const searchColumns = originTableColumnConfig.filter((item) =>
        isObject(item.search)
    )
    return searchColumns.length > 0
})

const onSearch = (payload: any) => {
    emit('search', payload)
}

// 搜索区域显隐（仅在存在搜索列时可见）
const searchVisible = ref(true)
const toggleSearchVisible = () => {
    searchVisible.value = !searchVisible.value
}

const { isToolButton, toolBtns, handleToolButtonClick } = useHeader(props, {
    actions: {
        toggleSearchVisible
    }
})

provide(tableContextKey, {
    tableColumns: props.tableColumns,
    cellChange: onCellChange
})
</script>

<template>
    <div :class="['pro-table', componentStyleClass]">
        <div class="pro-table__search" v-if="showSearch" v-show="searchVisible">
            <ProTableSearch @search="onSearch"></ProTableSearch>
        </div>
        <div class="pro-table__content">
            <div class="pro-table__header" v-if="!!props.showHeader">
                <div class="pro-table__header--left">
                    <!-- TODO 补全传递的数据，批量选中的数据 -->
                    <div
                        class="pro-table__header--left--title"
                        v-if="props.title"
                    >
                        <span>{{ props.title }}</span>
                    </div>
                    <slot name="tableHeader"> </slot>
                </div>
                <div class="pro-table__header--right" v-if="isToolButton">
                    <el-button
                        circle
                        v-for="item in toolBtns"
                        :key="item.key"
                        :icon="item.icon"
                        :title="item.title"
                        @click="handleToolButtonClick(item.key)"
                    ></el-button>
                </div>
            </div>
            <div class="pro-table__data">
                <TableData
                    v-bind="attrs"
                    :table-data="props.tableData"
                    :operation-column-config="operationColumnConfig"
                    :table-columns="props.tableColumns"
                >
                    <template
                        v-for="(_, slotName) in $slots"
                        #[slotName]="slotProps"
                    >
                        <slot :name="slotName" :slotProps="slotProps"></slot>
                    </template>
                </TableData>
            </div>
            <div class="pro-table__pagination"></div>
        </div>
    </div>
</template>
