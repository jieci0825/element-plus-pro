<script setup lang="ts">
import type { PropType } from 'vue'
import type {
    OperationColumnConfig,
    DisplayMode
} from './operation-column.type'
import { computed } from 'vue'
import { ElLink, ElButton } from 'element-plus'
import './operation-column.scss'
import { View, Delete, EditPen } from '@element-plus/icons-vue'
import { isBoolean, omit } from '@coderjc/element-plus-pro-utils'

const props = defineProps({
    config: {
        type: Object as PropType<Required<OperationColumnConfig>>,
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
const isPlain = computed(() => props.config.btnConfig?.plain ?? true)

// TODO 补全默认的 onClick 行为
const defaultBtnConfig = {
    view: {
        text: '查看',
        onClick: () => true,
        icon: View,
        type: 'primary',
        disabled: false,
        plain: isPlain.value
    },
    edit: {
        text: '编辑',
        onClick: () => true,
        icon: EditPen,
        type: 'primary',
        disabled: false,
        plain: isPlain.value
    },
    delete: {
        text: '删除',
        onClick: () => true,
        icon: Delete,
        type: 'danger',
        disabled: false,
        plain: isPlain.value
    }
}

function getBtnConfig(type: 'view' | 'edit' | 'delete') {
    const key = `${type}Btn`
    const option: any = (props.config.btnConfig as any)?.[key]

    if (isBoolean(option) && option === false) {
        return undefined
    }

    const mode = textOrIcon.value
    const removeKeys: string[] = []
    if (mode?.text !== mode?.icon) {
        removeKeys.push(mode?.text ? 'icon' : 'text')
    }

    const merged = omit(
        {
            ...defaultBtnConfig[type],
            ...(isBoolean(option) ? {} : option || {})
        },
        removeKeys
    )

    return merged
}

function isShowTextOrIcon(displayMode: DisplayMode | undefined) {
    const mode = displayMode ?? 'icon-text'
    const map: Record<DisplayMode, { text: boolean; icon: boolean }> = {
        'icon-only': { text: false, icon: true },
        'icon-text': { text: true, icon: true },
        'text-only': { text: true, icon: false }
    }
    return map[mode]
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
                @click="item.onClick(scoped.row)"
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
                @click="item.onClick(scoped.row)"
                >{{ item.text }}</el-button
            >
        </template>
    </div>
</template>
