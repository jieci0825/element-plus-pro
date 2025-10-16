import { computed } from 'vue'
import type { FooterBtn, ProFormFooterConfig } from './form'
import { isObject, mergeConfig } from '@coderjc/element-plus-pro-utils'
import { cloneDeep } from 'lodash-es'

function _customizer(objValue: any, srcValue: any) {
    // 当默认配置是一个对象，但是传入的用户配置不是一个对象的时候，就需要进行特殊处理
    if (isObject(objValue) && !isObject(srcValue)) {
        if (srcValue !== undefined && Boolean(srcValue) === false) {
            // 如果用户传入的是false，则隐藏，即其余配置合并，但是 hide 为true
            //  - 但是为了兼容，在 srcValue 不为 undefined 的情况下，只要强转后的 srcValue 为 false，则 hide 为 true
            return { ...objValue, hide: true }
        } else if (Boolean(srcValue) === true) {
            // 为 true 的时候，则显示，即其余配置合并，但是 hide 为 false
            return { ...objValue, hide: false }
        }
    }
}

interface InnerProFormFooterConfig extends Required<ProFormFooterConfig> {
    resetBtn: FooterBtn
    submitBtn: FooterBtn
}

export function formFooterProcess(footerConfig: ProFormFooterConfig | null) {
    let copyFooterConfig: any = cloneDeep(footerConfig || {})

    const showFooter = computed(() => {
        if (copyFooterConfig === undefined || isObject(copyFooterConfig)) {
            return true
        }
        return false
    })

    const defaultFooterConfig: ProFormFooterConfig = {
        align: 'right',
        onSubmit: undefined,
        onReset: undefined,
        resetBtn: {
            text: '重置',
            icon: undefined,
            hide: false
        },
        submitBtn: {
            text: '确认',
            icon: undefined,
            hide: false
        }
    }

    // 合并默认配置
    if (isObject(copyFooterConfig)) {
        copyFooterConfig = mergeConfig(
            defaultFooterConfig,
            copyFooterConfig,
            _customizer
        )
    } else {
        copyFooterConfig = defaultFooterConfig
    }

    return {
        showFooter,
        fullFooterConfig: copyFooterConfig as InnerProFormFooterConfig
    }
}
