import type { Ref } from 'vue'

/**
 * 代理组件实例
 */
export const useComponentProxy = <T extends object>(
    componentInstance: Ref<T | null>
): T => {
    const proxy = new Proxy({} as T, {
        get(target, key: string | symbol) {
            return (componentInstance.value as any)?.[key]
        },
        has(target, key: string | symbol) {
            return componentInstance.value
                ? key in componentInstance.value
                : false
        },
        set(target, key: string | symbol, value: any) {
            console.warn(
                `[useComponentProxy] You cannot make any changes to the instance.`
            )
            return false
        }
    })

    return proxy
}
