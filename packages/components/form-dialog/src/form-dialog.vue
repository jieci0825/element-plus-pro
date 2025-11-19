<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProDialog } from '../../dialog'
import { ProForm } from '../../form'
import { ElButton, FormInstance } from 'element-plus'
import { proFormDialogEmits } from './form-dialog'
import { useComponentProxy } from '@coderjc/element-plus-pro-hooks'

defineOptions({
    name: 'ProFormDialog'
})

const props = defineProps(['modelValue', 'formProps', 'formData'])
const emit = defineEmits(proFormDialogEmits)

// 控制对话框显示
const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(value: boolean) {
        emit('update:modelValue', value)
    }
})

// ProForm 实例引用
const proFormRef = ref()

// 内部维护的表单数据
const internalFormData = computed({
    get() {
        return props.formData
    },
    set(value: Record<string, any>) {
        emit('update:formData', value)
    }
})

// 强制关闭 ProForm 的页脚
const formPropsWithoutFooter = computed(() => {
    return {
        ...props.formProps,
        footerConfig: null
    }
})

// 处理取消
const handleCancel = () => {
    dialogVisible.value = false
}

// 处理确定/提交
const handleSubmit = async () => {
    try {
        await proFormRef.value?.validate()
        emit('submit', internalFormData.value)
        dialogVisible.value = false
    } catch (error) {
        // 验证失败，不关闭对话框
    }
}

// 对外暴露的表单的实例
defineExpose({
    proFormInstance: useComponentProxy<FormInstance>(proFormRef)
})
</script>

<template>
    <ProDialog v-model="dialogVisible" v-bind="$attrs">
        <ProForm
            ref="proFormRef"
            v-model="internalFormData"
            v-bind="formPropsWithoutFooter"
        >
            <!-- 透传 ProForm 的所有插槽（排除 footer） -->
            <template
                v-for="(_, slotName) in $slots"
                #[slotName]="slotProps"
                :key="slotName"
            >
                <slot
                    v-if="slotName !== 'footer'"
                    :name="slotName"
                    v-bind="slotProps"
                />
            </template>
        </ProForm>
        <template #footer>
            <!-- 如果外部提供了 footer 插槽，使用外部的；否则使用默认的 -->
            <slot
                name="footer"
                :handleCancel="handleCancel"
                :handleSubmit="handleSubmit"
            >
                <ElButton @click="handleCancel">取消</ElButton>
                <ElButton type="primary" @click="handleSubmit">确定</ElButton>
            </slot>
        </template>
    </ProDialog>
</template>
