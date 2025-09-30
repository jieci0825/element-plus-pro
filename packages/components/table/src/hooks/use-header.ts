import { computed } from 'vue'
import { isArray, isFunction } from 'lodash-es'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'
import type { ProTableProps } from '../table'

type ToolButtonTypes = 'refresh' | 'setting' | 'search'

type UseHeaderActions = {
    toggleSearchVisible?: Function
    refresh?: Function
    openDrawerVisible?: Function
}

type Options = {
    actions: UseHeaderActions
}

export function useHeader(props: ProTableProps, options: Options) {
    const { toolButton } = props
    const { actions = {} } = options

    const isToolButton = computed(() => {
        return isArray(toolButton) ? !!toolButton.length : !!toolButton
    })

    const originToolBtns: Array<{
        key: ToolButtonTypes
        icon: any
        title: string
    }> = [
        { key: 'refresh', icon: Refresh, title: '刷新' },
        { key: 'setting', icon: Operation, title: '列控制' },
        { key: 'search', icon: Search, title: '显/隐搜索' }
    ]

    const toolBtns = computed(() => {
        if (isArray(toolButton)) {
            return originToolBtns.filter((item) => {
                return toolButton.includes(item.key)
            })
        } else {
            if (!!toolButton === true) {
                return originToolBtns
            } else {
                return []
            }
        }
    })

    // 处理toolButton的点击事件
    const handleToolButtonClick = (key: ToolButtonTypes) => {
        switch (key) {
            case 'refresh':
                isFunction(actions.refresh) && actions.refresh()
                break
            case 'setting':
                isFunction(actions.openDrawerVisible) &&
                    actions.openDrawerVisible()
                break
            case 'search':
                isFunction(actions.toggleSearchVisible) &&
                    actions.toggleSearchVisible()
                break
        }
    }

    return {
        isToolButton,
        toolBtns,
        handleToolButtonClick
    }
}
