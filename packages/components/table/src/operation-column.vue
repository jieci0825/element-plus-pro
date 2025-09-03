<script setup lang="ts">
import type { PropType, Component } from 'vue'
import type { OperationColumnConfig } from './operation-column.type'
import { computed, h } from 'vue'
import { ElLink, ElButton } from 'element-plus'
import { assertRequired } from '@jc/element-plus-pro-utils'

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

// 使用工具函数断言已处理的配置
const btnProps = assertRequired(props.config.btnProps)

const size = computed(() => btnProps.size)

const getIcon = (index: number) => {
    return assertRequired(btnProps.btnIcons)[index]
}

const getBtnText = (index: number) => {
    return assertRequired(btnProps.btnTexts)[index]
}

const getBtnDisabled = (index: number) => {
    return assertRequired(btnProps.disabledBtns)[index]
}

const getBtnIsHide = (index: number) => {
    return assertRequired(btnProps.hideBtns)[index]
}

const getBtnComp = (index: number) => {
    const isTextBtn = btnProps.isTextBtn

    const _props: any = {
        size: size.value,
        type: index === 2 ? 'danger' : 'primary',
        icon: getIcon(index),
        disabled: getBtnDisabled(index)
    }

    if (isTextBtn) {
        _props.underline = true
    } else {
        _props.plain = true
    }

    const comp: Component = isTextBtn ? ElLink : ElButton

    if (getBtnIsHide(index)) {
        return null
    }

    return h(comp, _props, () => getBtnText(index))
}
</script>

<template>
    <div class="operation-column">
        <template v-for="index in [0, 1, 2]" :key="index">
            <Component :is="getBtnComp(index)" />
        </template>
    </div>
</template>

<style scoped lang="scss">
.operation-column {
    width: 100%;
    display: flex;
    justify-content: space-between;

    :deep(.el-link) {
        display: flex;
        gap: 3px;
    }
}
</style>
