<script setup lang="ts">
import TableData from './table-data.vue'
import ProDrawer from '../../drawer'
import { ColumnController } from './column-controller'
import { ProTableSearch } from './search'
import { ProTablePagination } from './pagination'
import { proTableEmits, proTableProps } from './table'
import { computed, provide, useAttrs, ref } from 'vue'
import {
    generateOperationColumnConfig,
    processColumnConfig
} from './process-column-config'
import './table.scss'
import { tableContextKey } from './constants'
import { useHeader, useTable } from './hooks'
import { useSlots } from 'vue'
import { flattenSearchColumns } from './helpers'
import { ElButton } from 'element-plus'

defineOptions({
    name: 'ProTable'
})

const attrs = useAttrs()
const props = defineProps(proTableProps)
const emit = defineEmits(proTableEmits)

const [originTableColumnConfig, _formatTableColumns] =
    processColumnConfig(props)
const formatTableColumns = ref(_formatTableColumns)

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

const {
    tableData,
    onSearchParamsChange,
    fetchData,
    pageable,
    onPageChange,
    onPageSizeChange,
    isLoading
} = useTable({
    api: props.requestApi,
    isPageable: props.pagination,
    initParam: props.initParams,
    dataCallBack: props.dataCallback,
    requestError: props.requestError,
    staticData: props.data, // 新增：传入静态数据
    page: props.page,
    pageSize: props.pageSize
})
// 如果需要自动执行请求，则加载组件直接执行一次
if (!!props.requestAuto) {
    onSearchParamsChange({})
}

/**
 * 是否显示 loading
 * 当 loading 为 true 且正在请求时显示加载状态
 */
const showLoading = computed(() => {
    return props.loading && isLoading.value
})

const showSearch = computed(() => {
    // 如果有搜索列配置，则显示搜索栏
    const searchColumns = flattenSearchColumns(originTableColumnConfig)
    return searchColumns.length > 0
})

const onSearch = (payload: any) => {
    onSearchParamsChange(payload)
}

const onReset = () => {
    onSearchParamsChange({})
}

// 搜索区域显隐（仅在存在搜索列时可见）
const searchVisible = ref(true)
const toggleSearchVisible = () => {
    searchVisible.value = !searchVisible.value
}
// 列控制器面板显示隐藏
const drawerVisible = ref(false)
const openDrawerVisible = () => {
    drawerVisible.value = true
}
const { isToolButton, toolBtns, handleToolButtonClick } = useHeader(props, {
    actions: {
        toggleSearchVisible,
        refresh: fetchData,
        openDrawerVisible
    }
})

const handleColumnShowOrHide = (payload: any) => {
    // @ts-ignore
    const item = formatTableColumns.value.find((col) => {
        return col.prop === payload.prop
    })
    if (item) {
        item.hidden = !payload.hidden
    }
}

const slots: any = useSlots()

provide(tableContextKey, {
    tableColumns: _formatTableColumns,
    cellChange: onCellChange
})
</script>

<template>
    <div :class="['pro-table', componentStyleClass]">
        <div class="pro-table__search" v-if="showSearch" v-show="searchVisible">
            <ProTableSearch
                :init-params="props.initParams"
                @reset="onReset"
                @search="onSearch"
            ></ProTableSearch>
        </div>
        <div class="pro-table__content">
            <div class="pro-table__header" v-if="!!props.showHeader">
                <div class="pro-table__header--left">
                    <div
                        class="pro-table__header--left--title"
                        v-if="props.title"
                    >
                        <span>{{ props.title }}</span>
                    </div>
                    <slot name="tableHeader"> </slot>
                </div>
                <div class="pro-table__header--right" v-if="isToolButton">
                    <slot name="toolButton">
                        <el-button
                            circle
                            v-for="item in toolBtns"
                            :key="item.key"
                            :icon="item.icon"
                            :title="item.title"
                            @click="handleToolButtonClick(item.key)"
                        ></el-button>
                    </slot>
                </div>
            </div>
            <div class="pro-table__data">
                <!-- 透传所有的属性和事件 -->
                <TableData
                    v-bind="attrs"
                    :table-data="tableData"
                    :operation-column-config="operationColumnConfig"
                    :table-columns="formatTableColumns"
                    :selection="props.selection"
                    :loading="showLoading"
                >
                    <template
                        v-for="(_, slotName) in slots"
                        #[slotName]="slotProps"
                    >
                        <slot :name="slotName" :row="slotProps.row"></slot>
                    </template>
                </TableData>
            </div>
            <div class="pro-table__pagination" v-if="!!props.pagination">
                <ProTablePagination
                    :pageable="pageable"
                    :page-sizes="props.pageSizes"
                    :handle-current-change="onPageChange"
                    :handle-size-change="onPageSizeChange"
                />
            </div>
        </div>

        <ProDrawer v-model="drawerVisible" title="列控制器" size="300px">
            <ColumnController
                :all-slots="$slots"
                :columns="originTableColumnConfig"
                @change="handleColumnShowOrHide"
            />
        </ProDrawer>
    </div>
</template>
