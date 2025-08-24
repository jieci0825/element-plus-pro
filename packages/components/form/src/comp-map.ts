import { ElInput, ElInputNumber } from 'element-plus'
import { EProFormItemType, ProFormItemType } from './form'
import { h } from 'vue'
import type { Component, Ref } from 'vue'

const CompMap: Record<string, Component> = {
    [EProFormItemType.INPUT]: ElInput,
    [EProFormItemType.PASSWORD]: ElInput,
    [EProFormItemType.INPUT_NUMBER]: ElInputNumber,
    [EProFormItemType.TEXTAREA]: ElInput,
    [EProFormItemType.SELECT]: () => '开发中...'
}

function generateCompName(type: string) {
    return `ProForm${type.charAt(0).toUpperCase()}${type.slice(1)}`
}

function createComp(
    formData: Ref<any>,
    formItem: ProFormItemType,
    options: any = {}
) {
    console.log('formItem', formItem)
    return h(
        CompMap[formItem.type!],
        {
            ...formItem.props,
            modelValue: formData.value[formItem.key],
            'onUpdate:modelValue': (value: any) => {
                options.onUpdateModelValue &&
                    options.onUpdateModelValue(formItem.key, value)
            }
        },
        formItem.elSlots
    )
}

// 创建组件映射
export function createFormItemCompMap(formData: Ref<any>, options: any = {}) {
    function getComp(item: ProFormItemType) {
        const { type } = item
        if (!type) return
        if (CompMap[type]) {
            return createComp(formData, item, options)
        }
        return h(
            generateCompName(type),
            {},
            () => `暂不支持该 "${type}" 组件类型`
        )
    }

    return [getComp]
}

/**
 * 1. 先判断是否是简单组件，如果是简单组件，直接处理
 * 2. 如果是复杂组件，则需要额外处理其子组件插槽和属性的绑定
 */
