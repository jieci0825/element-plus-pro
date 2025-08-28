import { computed } from 'vue'
import type { ProFormFooterConfig } from './form'
import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'

export function formFooterProcess(
    footerConfig: ProFormFooterConfig,
    elFormInstance: Ref<FormInstance>
) {
    const hideFooter = computed(() => {
        if (footerConfig === null) {
            return true
        }
        return false
    })

    const resetText = computed(() => {
        let text = '重置'
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
        hideFooter,
        resetText,
        submitText,
        hideResetBtn,
        hideSubmitBtn
    }
}
