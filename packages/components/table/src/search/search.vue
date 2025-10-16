<script setup lang="ts">
import ProForm from '../../../form'
import { ref, computed, inject, onMounted } from 'vue'
import { tableContextKey } from '../constants'
import { isObject } from '@coderjc/element-plus-pro-utils'
import {
    Search,
    RefreshLeft,
    ArrowDown,
    ArrowUp
} from '@element-plus/icons-vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import './search.scss'

const props = defineProps(['initParams'])
const emit = defineEmits(['search', 'reset'])
const tabelContextInject = inject(tableContextKey)

// 递归提取所有配置了 search 的列（包括嵌套列的叶子节点）
const flattenSearchColumns = (columns: any[]): any[] => {
    const result: any[] = []

    const traverse = (cols: any[]) => {
        cols.forEach((col) => {
            if (col.children && col.children.length > 0) {
                // 如果有 children，递归处理子列
                traverse(col.children)
            } else if (isObject(col.search)) {
                // 如果是叶子节点且配置了 search，添加到结果中
                result.push(col)
            }
        })
    }

    traverse(columns)
    return result
}

// 提取需要列配置
const tableColumns = computed(() => {
    return flattenSearchColumns(tabelContextInject?.tableColumns || [])
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

const model = ref({ ...props.initParams })

const getProFormProps = () => {
    const defaultProFormProps = {
        formItems: searchFormItems.value,
        inline: true,
        labelWidth: 'auto'
        // col: { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 },
    }

    return defaultProFormProps
}

const isExpand = ref(false)
// 使用计算属性得到每个搜索表单项配置应该占据的列数
const formItemCols = computed(() => {
    // 如果是  ['daterange', 'datetimerange']，则占据两列
    return searchFormItems.value.map((item) => {
        if (item.type === 'daterange' || item.type === 'datetimerange') {
            return 2
        }
        return 1
    })
})

function getWindowWidth() {
    return window.innerWidth
}

// 得到第一行需要显示的formItem索引
function getFirstRowShowIndex() {
    const w = getWindowWidth()
    let col = 1
    if (w >= 1920) {
        col = 4
    } else if (w >= 1200) {
        col = 3
    } else if (w >= 768) {
        col = 2
    }

    let count = 1 // 初始为 1，因为默认 footer 占据一列
    let index = 0
    for (let i = 0; i < formItemCols.value.length; i++) {
        if (count >= col) {
            index = i
            break
        }
        count += formItemCols.value[i]
    }

    return index
}

// 展开方法
const handleExpand = () => {
    const formItems = Array.from(
        document.querySelectorAll('.pro-table__search--inner .el-row .el-col')
    )

    formItems.forEach((item: any) => {
        item.style.display = 'block'
    })
}

// 折叠
const handleCollapse = () => {
    // 得到当前屏幕应该占据的列数
    const index = getFirstRowShowIndex()
    // 根据 index 显示第一行应显示的表单项，隐藏其余
    const formItems = Array.from(
        document.querySelectorAll('.pro-table__search--inner .el-row .el-col')
    ).slice(0, -1) // 排除最后一个，因为最后一个为 footer
    formItems.forEach((item: any, i: number) => {
        // i = 0 时，不会隐藏
        if (i === 0) return
        item.style.display = i < index ? 'block' : 'none'
    })
}

// 切换
const handleToggle = () => {
    isExpand.value = !isExpand.value
    if (isExpand.value) {
        handleExpand()
    } else {
        handleCollapse()
    }
}

// 当处于折叠状态时，监听窗口大小变化并重新折叠（useEventListener）
const onResize = useThrottleFn(() => {
    if (!isExpand.value) {
        handleCollapse()
    }
}, 200)
useEventListener(window, 'resize', onResize)

// 在刚进入页面时，调用一次折叠
onMounted(() => {
    handleCollapse()
})

const proFormRef = ref()

const handleReset = () => {
    proFormRef.value.resetFields()
    emit('reset')
}

const handleSearch = () => {
    emit('search', model.value)
}
</script>

<template>
    <div class="pro-table__search--inner">
        <ProForm ref="proFormRef" v-model="model" v-bind="getProFormProps()">
            <template #footer>
                <div class="footer-wrap">
                    <el-button :icon="RefreshLeft" @click="handleReset"
                        >重置</el-button
                    >
                    <el-button
                        type="primary"
                        :icon="Search"
                        @click="handleSearch"
                        >搜索</el-button
                    >
                    <el-link
                        type="primary"
                        :underline="false"
                        @click="handleToggle"
                    >
                        {{ isExpand ? '收起' : '展开' }}
                        <el-icon size="18">
                            <ArrowDown v-if="!isExpand" />
                            <ArrowUp v-else />
                        </el-icon>
                    </el-link>
                </div>
            </template>
        </ProForm>
    </div>
</template>
