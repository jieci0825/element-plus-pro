import { isFunction, isObject } from './types'
import { h, markRaw, toRaw, type Component } from 'vue'

/**
 * 获取从 options 传递过来的默认插槽
 * @param elSlots element slots
 */
export const getElDefaultSlot = (elSlots: any) => {
    if (!elSlots) return undefined
    if (isObject(elSlots)) {
        return (elSlots as any).default || elSlots
    }
    if (isFunction(elSlots)) {
        return elSlots
    }
}

/**
 * 通用类型断言函数 - 将可选类型断言为必需类型
 * 用于处理经过处理函数后，原本可选的属性变为必需的情况
 */
export function assertRequired<T>(value: T): NonNullable<T> {
    return value as NonNullable<T>
}

/**
 * 获取默认插槽并转换为组件
 * @param option
 * @returns component
 */
export const getElDefaultSlotAndToComponent = (option: any): Component => {
    // 使用 toRaw 获取原始数据，避免响应式包装
    const rawOption = toRaw(option)
    const elDefaultSlot = getElDefaultSlot(rawOption?.elSlots)

    let result: Component
    if (elDefaultSlot) {
        result = elDefaultSlot
    } else {
        result = () => h('span', null, rawOption?.label)
    }
    // 使用 markRaw 进行包裹，标记为非响应式对象，避免额外性能开销和消除响应式警告
    return markRaw(result)
}
