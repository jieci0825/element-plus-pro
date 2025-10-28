import { h, Comment } from 'vue'
import {
    DatePickType,
    ElColorPicker,
    ElDatePicker,
    ElInput,
    ElInputNumber,
    ElSwitch
} from 'element-plus'
import type { ProFormItemConfig, ProFormItemTypeKeys } from './form-item.type'
import { isEmptyObj } from '@coderjc/element-plus-pro-utils'
import {
    JcCheckbox,
    JcCheckboxButton,
    JcGroupSelect,
    JcRadio,
    JcRadioButton,
    JcSelect,
    JcUpload
} from './jc-comps'
import type { Component, Ref } from 'vue'

// 空组件
const EmptyComp = ({ type }: { type: string }) =>
    h(Comment, `暂不支持该 ${type} 类型的组件`)

const CompMap: Record<string, Component> = {
    // 单组件
    input: ElInput,
    password: ElInput,
    input_number: ElInputNumber,
    textarea: ElInput,
    switch: ElSwitch,
    color: ElColorPicker,
    // 多组件
    upload: JcUpload,
    select: JcSelect,
    group_select: JcGroupSelect,
    radio: JcRadio,
    radio_button: JcRadioButton,
    checkbox: JcCheckbox,
    checkbox_button: JcCheckboxButton
}

const DatePickTypes: DatePickType[] = [
    'year',
    'years',
    'month',
    'months',
    'date',
    'dates',
    'datetime',
    'week',
    'datetimerange',
    'daterange',
    'monthrange',
    'yearrange'
]

// 需要自定义 props 的类型
const typesWithCustomProps: ProFormItemTypeKeys[] = [
    ...DatePickTypes,
    'password',
    'textarea'
]

/**
 * 根据类型获取组件
 */
function getComponentByType(
    type: ProFormItemTypeKeys | undefined
): Component | undefined {
    if (!type) return undefined
    // 如果可以从映射表中找到，则直接返回
    if (CompMap[type]) {
        return CompMap[type]
    }
    // 找不到则从判断是否是日期选择器
    if (DatePickTypes.includes(type as DatePickType)) {
        return ElDatePicker
    }
    return undefined
}

/**
 * 获取有效的类型
 */
function getEffectiveType(
    type: ProFormItemTypeKeys | undefined
): ProFormItemTypeKeys | undefined {
    if (!type) return undefined
    if (typesWithCustomProps.includes(type)) {
        return type
    }
}

/**
 * 创建组件
 */
function createComp(
    component: Component,
    formData: Ref<any>,
    formItem: ProFormItemConfig,
    options: any = {}
) {
    return h(
        component,
        {
            ...formItem.props,
            // formItemRaw: formItem
            type: getEffectiveType(formItem.type),
            modelValue: formData.value[formItem.key],
            'onUpdate:modelValue': (value: any) => {
                options.onUpdateModelValue &&
                    options.onUpdateModelValue(formItem.key, value)
            }
        },
        isEmptyObj(formItem.elSlots) ? undefined : formItem.elSlots
    )
}

/**
 * 创建组件映射
 */
export function createFormItemCompMap(formData: Ref<any>, options: any = {}) {
    function getComp(item: ProFormItemConfig) {
        const renderComponent = getComponentByType(item.type)
        if (!renderComponent) return EmptyComp({ type: item.type! })
        return createComp(renderComponent, formData, item, options)
    }

    return [getComp]
}
