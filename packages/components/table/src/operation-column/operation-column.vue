<script setup lang="ts">
import type { PropType } from 'vue'
import type {
    OperationColumnConfig,
    OperationColumnConfigBtnOption
} from './operation-column.type'
import { computed } from 'vue'
import { ElLink, ElButton } from 'element-plus'
import './operation-column.scss'
import { View, Delete, EditPen } from '@element-plus/icons-vue'
import { isBoolean, omit } from '@jc/element-plus-pro-utils'

const props = defineProps({
    config: {
        type: Object as PropType<OperationColumnConfig>,
        required: true
    },
    scoped: {
        type: Object as PropType<any>,
        required: true
    }
})

const isTextBtn = computed(() => !!props.config.btnConfig.isTextBtn)
const textOrIcon = computed(() =>
    isShowTextOrIcon(props.config.btnConfig.displayMode)
)

// TODO 补全默认的 onClick 行为
const defaultBtnConfig = {
    view: {
        text: '查看',
        onClick: undefined,
        icon: View,
        type: 'primary',
        disabled: false,
        plain: true
    },
    edit: {
        text: '编辑',
        onClick: undefined,
        icon: EditPen,
        type: 'primary',
        disabled: false,
        plain: true
    },
    delete: {
        text: '删除',
        onClick: undefined,
        icon: Delete,
        type: 'danger',
        disabled: false,
        plain: true
    }
}

function getBtnConfig(type: 'view' | 'edit' | 'delete') {
    if (
        type === 'view' &&
        isBoolean(props.config?.btnConfig?.viewBtn) &&
        !props.config?.btnConfig?.viewBtn
    ) {
        return undefined
    } else if (
        type === 'edit' &&
        isBoolean(props.config?.btnConfig?.editBtn) &&
        !props.config?.btnConfig?.editBtn
    ) {
        return undefined
    } else if (
        type === 'delete' &&
        isBoolean(props.config?.btnConfig?.deleteBtn) &&
        !props.config?.btnConfig?.deleteBtn
    ) {
        return undefined
    }

    let _btnConfig: any = defaultBtnConfig[type]

    const removeKeys = []
    if (textOrIcon.value.text === true && textOrIcon.value.icon === false) {
        removeKeys.push('icon')
    } else if (
        textOrIcon.value.text === false &&
        textOrIcon.value.icon === true
    ) {
        removeKeys.push('text')
    }

    // 因为后面要进行移除，所以提前拿出来存储
    const originHandle = props.config?.btnConfig?.[type]?.onClick

    if (originHandle) {
        _btnConfig.onClick = originHandle
    }

    const key = `${type}Btn`

    _btnConfig = omit(
        {
            ..._btnConfig,
            ...(props.config?.btnConfig?.[key] || {})
        },
        removeKeys
    )

    return _btnConfig
}

function isShowTextOrIcon(
    displayMode: OperationColumnConfigBtnOption['displayMode'] | undefined
) {
    displayMode = displayMode || 'icon-text'
    if (displayMode === 'icon-only') {
        return { text: false, icon: true }
    } else if (displayMode === 'icon-text') {
        return { text: true, icon: true }
    } else if (displayMode === 'text-only') {
        return { text: true, icon: false }
    }
}

const renderPropsList = [
    getBtnConfig('view'),
    getBtnConfig('edit'),
    getBtnConfig('delete')
].filter(Boolean)
</script>

<template>
    <div class="operation-column">
        <!-- 文本按钮-实际为el-link -->
        <template v-if="isTextBtn">
            <el-link
                underline="never"
                v-for="(item, index) in renderPropsList"
                :key="index"
                :icon="item.icon"
                :type="item.type"
                :disabled="item.disabled"
                @click="item.onClick || (() => 1)"
                >{{ item.text }}</el-link
            >
        </template>
        <template v-else>
            <el-button
                size="small"
                v-for="(item, index) in renderPropsList"
                :key="index"
                :plain="!!item.plain"
                :icon="item.icon"
                :type="item.type"
                :disabled="item.disabled"
                >{{ item.text }}</el-button
            >
        </template>
    </div>
</template>
