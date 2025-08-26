import { h } from 'vue'
import { ElInput, ElInputNumber } from 'element-plus'
import { EProFormItemType, ProFormItemType } from './form'
import { isEmptyObj } from '@jc/element-plus-pro-utils'
import { JcGroupSelect, JcRadio, JcRadioButton, JcSelect } from './jc-comps'
import type { Component, Ref } from 'vue'

const CompMap: Record<string, Component> = {
    [EProFormItemType.INPUT]: ElInput,
    [EProFormItemType.PASSWORD]: ElInput,
    [EProFormItemType.INPUT_NUMBER]: ElInputNumber,
    [EProFormItemType.TEXTAREA]: ElInput,
    [EProFormItemType.SELECT]: JcSelect,
    [EProFormItemType.GROUP_SELECT]: JcGroupSelect,
    [EProFormItemType.RADIO]: JcRadio,
    [EProFormItemType.RADIO_BUTTON]: JcRadioButton
}

function createComp(
    formData: Ref<any>,
    formItem: ProFormItemType,
    options: any = {}
) {
    return h(
        CompMap[formItem.type!],
        {
            ...formItem.props,
            // formItemRaw: formItem,
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
