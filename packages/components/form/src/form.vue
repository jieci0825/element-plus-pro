<script setup lang="ts">
import { useTemplateRef, computed } from 'vue'
import {
    EProFormItemType,
    proFormEmits,
    ProFormItemType,
    proFormProps
} from './form'
import { processFormItems } from './form-item-processor'
import { ElInput, ElForm, ElRow, ElCol, ElFormItem } from 'element-plus'
import { isString, isUndefined } from '@jc/element-plus-pro-utils'
import { UPDATE_MODEL_EVENT } from '@jc/element-plus-pro-constants'

defineOptions({
    name: 'ProForm'
})

const props = defineProps(proFormProps)
const emit = defineEmits(proFormEmits)
const elFormInstance = useTemplateRef('elFormRef')
console.log('elFormInstance', elFormInstance)

const formData = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        console.log('~~新值~~', newValue)
        emit(UPDATE_MODEL_EVENT, newValue)
    }
})

// 计算表单项配置项列表
const items = computed(() => processFormItems(props))

// 组件映射
const FormItemCompMap = {
    [EProFormItemType.INPUT]: ElInput
}

function isValidComponentKey(key: string): key is keyof typeof FormItemCompMap {
    return key in FormItemCompMap
}

// 获取表单项组件
function getFormItemComp(item: ProFormItemType) {
    const { type } = item
    if (isUndefined(type)) {
        return ElInput
    }
    if (isString(type) && isValidComponentKey(type)) {
        return FormItemCompMap[type]
    }
    return type
}

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
                        <Component
                            :is="getFormItemComp(item)"
                            v-model="formData[item.key]"
                            v-bind="item.props"
                        >
                            <template
                                v-for="(_, slotName) in item.elSlots!"
                                #[slotName]
                            >
                                <Component
                                    :item="item"
                                    :is="item.elSlots![slotName]"
                                />
                            </template>
                        </Component>
                    </template>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
