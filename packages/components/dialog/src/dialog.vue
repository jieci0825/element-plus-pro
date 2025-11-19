<script setup lang="ts">
import { ElDialog } from 'element-plus'
import './dialog.scss'
import { proDialogEmits } from './dialog'
import { computed, toRef, useAttrs, useTemplateRef } from 'vue'
import { useComponentProxy } from '@coderjc/element-plus-pro-hooks'

type DialogExpose = { handleClose: () => void }

defineOptions({
    name: 'ProDialog'
})

const props = defineProps(['modelValue', 'autoHeight'])
const emit = defineEmits(proDialogEmits)
const attrs = useAttrs()

// 代理内部 el-dialog 实例，暴露方法
const dialogRef = useTemplateRef<DialogExpose>('dialogRef')
defineExpose(useComponentProxy<DialogExpose>(dialogRef))

// 将外部 modelValue 与内部双向绑定
const visibleProp = toRef(props, 'modelValue')
const dialogModel = computed({
    get() {
        return visibleProp.value
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})

const defaultProps = {
    destroyOnClose: true,
    closeOnClickModal: false
}
</script>

<template>
    <ElDialog
        ref="dialogRef"
        class="pro-dialog"
        v-model="dialogModel"
        v-bind="{ ...defaultProps, ...attrs }"
    >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </ElDialog>
</template>
