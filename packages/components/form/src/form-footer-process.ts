import { computed } from 'vue'
import type { ProFormFooterConfig } from './form'
import { isObject } from '@jc/element-plus-pro-utils'

export function formFooterProcess(footerConfig: ProFormFooterConfig | null) {
    const showFooter = computed(() => {
        if (footerConfig === undefined || isObject(footerConfig)) {
            return true
        }
        return false
    })

    const defaultFooterConfig: ProFormFooterConfig = {
        hideBtns: [false, false],
        btnTexts: ['重置', '确认'],
        align: 'right',
        onSubmit: undefined,
        onReset: undefined,
        span: 24
    }

    // 合并默认配置
    if (isObject(footerConfig)) {
        footerConfig = {
            ...defaultFooterConfig,
            ...footerConfig
        }
    } else {
        footerConfig = defaultFooterConfig
    }

    const resetText = computed(() => {
        let text = '重置'
        if (!footerConfig) return
        if (footerConfig.btnTexts && footerConfig.btnTexts[0]) {
            text = footerConfig.btnTexts[0]
        }
        return text
    })

    const submitText = computed(() => {
        let text = '确认'
        if (footerConfig.btnTexts && footerConfig.btnTexts[1]) {
            text = footerConfig.btnTexts[1]
        }
        return text
    })

    const hideResetBtn = computed(() => {
        let flag = false
        if (footerConfig.hideBtns && footerConfig.hideBtns[0]) {
            flag = footerConfig.hideBtns[0]
        }
        return flag
    })

    const hideSubmitBtn = computed(() => {
        let flag = false
        if (footerConfig.hideBtns && footerConfig.hideBtns[1]) {
            flag = footerConfig.hideBtns[1]
        }
        return flag
    })

    return {
        showFooter,
        resetText,
        submitText,
        hideResetBtn,
        hideSubmitBtn,
        fullFooterConfig: footerConfig
    }
}
