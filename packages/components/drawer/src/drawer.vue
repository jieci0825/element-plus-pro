<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import './drawer.scss'
import { proDrawerEmits, proDrawerProps } from './drawer'
import { computed, toRef, useAttrs, useTemplateRef } from 'vue'
import { useComponentProxy } from '@coderjc/element-plus-pro-hooks'
type DrawerExpose = { handleClose: () => void }

defineOptions({
    name: 'ProDrawer'
})

const props = defineProps(proDrawerProps)
const emit = defineEmits(proDrawerEmits)
const attrs = useAttrs()

// 代理内部 el-drawer 实例，暴露 handleClose
const drawerRef = useTemplateRef<DrawerExpose>('drawerRef')
defineExpose(useComponentProxy<DrawerExpose>(drawerRef))

// 将外部 visible 与内部 modelValue 双向绑定
const visibleProp = toRef(props, 'modelValue')
const drawerModel = computed({
    get() {
        return visibleProp.value
    },
    set(value: boolean) {
        emit('update:visible', value)
    }
})

const defaultProps = {
    destroyOnClose: true,
    closeOnClickModal: false
}
</script>

<template>
    <ElDrawer
        ref="drawerRef"
        class="pro-drawer"
        v-model="drawerModel"
        v-bind="{ ...defaultProps, ...attrs }"
    >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </ElDrawer>
</template>
