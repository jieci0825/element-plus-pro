<script setup lang="ts">
import { useTemplateRef, computed, toRef, h } from 'vue'
import { proFormEmits, type ProFormFooterConfig, proFormProps } from './form'
import { processFormItems } from './form-item-process'
import {
    ElForm,
    ElRow,
    ElCol,
    ElFormItem,
    ElButton,
    ElMessageBox
} from 'element-plus'
import { UPDATE_MODEL_EVENT } from '@coderjc/element-plus-pro-constants'
import { useComponentProxy } from '@coderjc/element-plus-pro-hooks'
import { createFormItemCompMap } from './comp-map'
import { isFunction, isString } from '@coderjc/element-plus-pro-utils'
import { JcLabelTooltip } from './jc-comps'
import { formFooterProcess } from './form-footer-process'
import type { FormInstance } from 'element-plus'
import type { ProFormItemConfig } from './form-item.type'
import './form.scss'

defineOptions({
    name: 'ProForm'
})

const props = defineProps(proFormProps)
const emit = defineEmits(proFormEmits)
const elFormInstance = useTemplateRef<FormInstance>('elFormRef')

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

const getFormItemLabelComp = (item: ProFormItemConfig) => {
    if (isString(item.label)) {
        if (item.tooltip && isString(item.tooltip)) {
            return h(JcLabelTooltip, {
                label: item.label,
                tooltip: item.tooltip
            })
        }
        return undefined
    }
    if (isFunction(item.label)) {
        return item.label
    }
}

const { showFooter, fullFooterConfig } = formFooterProcess(props.footerConfig)

const handleSubmit = async () => {
    const onSubmit = fullFooterConfig?.onSubmit
    if (onSubmit && isFunction(onSubmit)) {
        onSubmit(formData.value)
        return
    }

    try {
        await elFormInstance.value?.validate()
        emit('submit', formData.value)
    } catch (error) {}
}

const handleReset = () => {
    const onReset = fullFooterConfig?.onReset
    if (onReset && isFunction(onReset)) {
        onReset()
        return
    }
    if (props.resetInterceptor) {
        ElMessageBox.confirm('确定要重置表单吗？', '重置表单提示', {
            type: 'warning'
        })
            .then(() => {
                elFormInstance.value?.resetFields()
            })
            .catch(() => {})
            .finally(() => {
                emit('reset')
            })
    } else {
        elFormInstance.value?.resetFields()
        emit('reset')
    }
}

function getColProps(item: ProFormItemConfig | ProFormFooterConfig) {
    const defaultColProps = {
        span: 24
    }

    return { ...defaultColProps, ...(props.col || {}), ...(item.col || {}) }
}

const getFormItemClassByType = (type: string) => {
    const ranges = ['daterange', 'datetimerange']
    if (ranges.includes(type)) {
        return 'jc-pro-form-item-range'
    }
    return `jc-pro-form-item-${type}`
}

defineExpose(useComponentProxy<FormInstance>(elFormInstance))
</script>

<template>
    <div class="pro-form">
        <el-form ref="elFormRef" :model="formData" v-bind="$attrs">
            <el-row :gutter="props.gutter">
                <el-col
                    v-for="item in items"
                    :key="item.key"
                    v-bind="getColProps(item)"
                    :class="getFormItemClassByType(item.type!)"
                >
                    <el-form-item
                        v-if="!item.hideLabel"
                        :label="isString(item.label) ? item.label : undefined"
                        :prop="item.key"
                    >
                        <template v-if="getFormItemLabelComp(item)" #label>
                            <Component :is="getFormItemLabelComp(item)" />
                        </template>
                        <template v-if="item.customSlot">
                            <slot :name="item.key"></slot>
                        </template>
                        <template v-else>
                            <Component :is="getComp(item)" />
                        </template>
                    </el-form-item>
                    <template v-else :prop="item.key">
                        <template v-if="item.customSlot">
                            <slot :name="item.key"></slot>
                        </template>
                        <template v-else>
                            <Component :is="getComp(item)" />
                        </template>
                    </template>
                </el-col>
                <el-col
                    class="jc-pro-form-item-footer"
                    v-if="showFooter"
                    v-bind="getColProps(fullFooterConfig)"
                >
                    <el-form-item>
                        <slot name="footer">
                            <div
                                :class="[
                                    'footer',
                                    `footer--${fullFooterConfig?.align || 'right'}`
                                ]"
                            >
                                <el-button
                                    :icon="fullFooterConfig.resetBtn.icon"
                                    v-if="!fullFooterConfig.resetBtn.hide"
                                    @click="handleReset"
                                    >{{
                                        fullFooterConfig.resetBtn.text
                                    }}</el-button
                                >
                                <el-button
                                    type="primary"
                                    :icon="fullFooterConfig.submitBtn.icon"
                                    v-if="!fullFooterConfig.submitBtn.hide"
                                    @click="handleSubmit"
                                    >{{
                                        fullFooterConfig.submitBtn.text
                                    }}</el-button
                                >
                            </div>
                        </slot>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.footer--left {
    justify-content: flex-start;
}
.footer--center {
    justify-content: center;
}
</style>
