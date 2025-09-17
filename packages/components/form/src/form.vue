<script setup lang="ts">
import { useTemplateRef, computed, toRef, h } from 'vue'
import { proFormEmits, proFormProps } from './form'
import { processFormItems } from './form-item-processor'
import { ElForm, ElRow, ElCol, ElFormItem } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { UPDATE_MODEL_EVENT } from '@jc/element-plus-pro-constants'
import { useComponentProxy } from '@jc/element-plus-pro-hooks'
import { createFormItemCompMap } from './comp-map'
import { isFunction, isString } from '@jc/element-plus-pro-utils'
import { JcLabelTooltip } from './jc-comps'
import { formFooterProcess } from './form-footer-process'
import { ProFormItemType } from './form-item.type'

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

const getFormItemLabelComp = (item: ProFormItemType) => {
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

const {
    showFooter,
    submitText,
    resetText,
    hideResetBtn,
    hideSubmitBtn,
    fullFooterConfig
} = formFooterProcess(props.footerConfig)

const handleSubmit = async () => {
    const onSubmit = fullFooterConfig?.onSubmit
    if (onSubmit && isFunction(onSubmit)) {
        onSubmit()
        return
    }

    let errInfo: any = null

    await elFormInstance.value?.validate((valid, fields) => {
        if (!valid) {
            errInfo = fields
        }
    })
    emit('submit', formData.value, errInfo)
}

const handleReset = () => {
    const onReset = fullFooterConfig?.onReset
    if (onReset && isFunction(onReset)) {
        onReset()
        return
    }
    elFormInstance.value?.resetFields()
    emit('reset')
}

defineExpose(useComponentProxy<FormInstance>(elFormInstance))
</script>

<template>
    <el-form ref="elFormRef" :model="formData" v-bind="$attrs">
        <el-row :gutter="props.gutter">
            <el-col
                v-for="item in items"
                :key="item.key"
                :span="item.span || props.span"
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
                v-if="showFooter"
                :span="props.span || fullFooterConfig?.span || 24"
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
                                v-if="!hideResetBtn"
                                @click="handleReset"
                                >{{ resetText }}</el-button
                            >
                            <el-button
                                v-if="!hideSubmitBtn"
                                @click="handleSubmit"
                                type="primary"
                                >{{ submitText }}</el-button
                            >
                        </div>
                    </slot>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
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
