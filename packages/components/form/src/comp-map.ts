import { h } from 'vue'
import { ElInput, ElInputNumber, ElSwitch } from 'element-plus'
import { EProFormItemType, ProFormItemType } from './form'
import { isEmptyObj } from '@jc/element-plus-pro-utils'
import {
    JcCheckbox,
    JcCheckboxButton,
    JcGroupSelect,
    JcRadio,
    JcRadioButton,
    JcSelect
} from './jc-comps'
import type { Component, Ref } from 'vue'

const CompMap: Record<string, Component> = {
    // 单组件
    [EProFormItemType.INPUT]: ElInput,
    [EProFormItemType.PASSWORD]: ElInput,
    [EProFormItemType.INPUT_NUMBER]: ElInputNumber,
    [EProFormItemType.TEXTAREA]: ElInput,
    [EProFormItemType.SWITCH]: ElSwitch,
    // 多组件
    [EProFormItemType.SELECT]: JcSelect,
    [EProFormItemType.GROUP_SELECT]: JcGroupSelect,
    [EProFormItemType.RADIO]: JcRadio,
    [EProFormItemType.RADIO_BUTTON]: JcRadioButton,
    [EProFormItemType.CHECKBOX]: JcCheckbox,
    [EProFormItemType.CHECKBOX_BUTTON]: JcCheckboxButton
}

function createComp(
    formData: Ref<any>,
    formItem: ProFormItemType,
    options: any = {}
) {
    const withTypeMap: Record<string, string> = {
        [EProFormItemType.PASSWORD]: 'password',
        [EProFormItemType.TEXTAREA]: 'textarea'
    }
    return h(
        CompMap[formItem.type!],
        {
            ...formItem.props,
            // formItemRaw: formItem
            type: withTypeMap[formItem.type!],
            modelValue: formData.value[formItem.key],
            'onUpdate:modelValue': (value: any) => {
                options.onUpdateModelValue &&
                    options.onUpdateModelValue(formItem.key, value)
            }
        },
        isEmptyObj(formItem.elSlots) ? undefined : formItem.elSlots
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
            'div',
            { style: { color: 'red', fontWeight: 'bold' } },
            `暂不支持该 "${type}" 组件类型`
        )
    }

    return [getComp]
}
