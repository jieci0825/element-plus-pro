<script setup lang="ts">
import { useTemplateRef, computed, toRef } from 'vue'
import { proFormEmits, proFormProps } from './form'
import { processFormItems } from './form-item-processor'
import { ElForm, ElRow, ElCol, ElFormItem } from 'element-plus'
import { UPDATE_MODEL_EVENT } from '@jc/element-plus-pro-constants'
import { createFormItemCompMap } from './comp-map'

defineOptions({
    name: 'ProForm'
})

const props = defineProps(proFormProps)
const emit = defineEmits(proFormEmits)
const elFormInstance = useTemplateRef('elFormRef')

const formData = toRef(props, 'modelValue')

// 个处理表单项值更新
function updateFormValue(key: string, value: any) {
    const newFormData = { ...formData.value, [key]: value }
    emit(UPDATE_MODEL_EVENT, newFormData)
}

// 计算表单项配置项列表
const items = computed(() => processFormItems(props))

const [getComp] = createFormItemCompMap(formData, {
    onUpdateModelValue: updateFormValue
})

defineExpose({
    a: 1
})
</script>

<template>
    <el-form ref="elFormRef" :model="formData" v-bind="$attrs">
        <el-row :gutter="props.gutter">
            <el-col
                v-for="item in items"
                :key="item.key"
                :span="item.span || props.span"
            >
                <el-form-item :label="item.label" :prop="item.key">
                    <template v-if="item.customSlot">
                        <slot :name="item.key"></slot>
                    </template>
                    <template v-else>
                        <Component :is="getComp(item)" />
                    </template>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
