<script setup lang="ts">
import type { PropType, Component } from 'vue'
import type { OperationColumnConfig } from './operateion-columb.type'
import { computed, h } from 'vue'
import { ElLink, ElButton } from 'element-plus'

const props = defineProps({
    config: {
        type: Object as PropType<OperationColumnConfig>,
        required: true
    }
})

const size = computed(() => props.config.btnProps.size)

const getIcon = (index: number) => {
    return props.config.btnProps.btnIcons[index]
}

const getBtnText = (index: number) => {
    return props.config.btnProps.btnTexts[index]
}

const getBtnDisabled = (index: number) => {
    return props.config.btnProps.disabledBtns[index]
}

const getBtnIsHide = (index: number) => {
    return props.config.btnProps.hideBtns[index]
}

const getBtnComp = (index: number) => {
    const isTextBtn = props.config.btnProps.isTextBtn

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
