<script setup lang="ts">
import ProForm from '../../../form'
import { ref, computed, inject, onMounted } from 'vue'
import { tableContextKey } from '../constants'
import {
    Search,
    RefreshLeft,
    ArrowDown,
    ArrowUp
} from '@element-plus/icons-vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'
import './search.scss'
import { flattenSearchColumns } from '../helpers'
import { ElButton, ElLink, ElIcon } from 'element-plus'

const props = defineProps(['initParams'])
const emit = defineEmits(['search', 'reset'])
const tabelContextInject = inject(tableContextKey)

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
const searchInnerRef = ref<HTMLElement>()

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

// 获取表单区域的实际宽度
function getSearchAreaWidth() {
    return searchInnerRef.value?.offsetWidth || window.innerWidth
}

// 得到第一行需要显示的formItem索引
function getFirstRowShowIndex() {
    const w = getSearchAreaWidth()
    let col = 1
    if (w >= 1920) {
        col = 4
    } else if (w >= 1200) {
        col = 3
    } else if (w >= 480) {
        col = 2
    }

    let count = 1 // 初始为 1，因为默认 footer 占据一列
    let index = 0

    // 如果所有的 formItemCols 的值加起来小于 col，则表示没有需要折叠隐藏的
    if (formItemCols.value.reduce((a, b) => a + b, 0) <= col - count) {
        return formItemCols.value.length - 1
    }

    // 如果不满足上面的拦截条件，则需要计算需要折叠隐藏的表单项索引
    for (let i = 0; i < formItemCols.value.length; i++) {
        count += formItemCols.value[i]
        if (count >= col) {
            index = i
            break
        }
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
    <div ref="searchInnerRef" class="pro-table__search--inner">
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
