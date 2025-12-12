import { getCurrentInstance, ref } from 'vue'

/**
 * 暴露组件实例
 * @description 如果暴露的时候还有其他属性需要暴露，可以传入 componentInstancePropName 参数
 * @param keyRef 组件实例的引用
 * @param componentInstancePropName 组件实例的属性名
 * @returns 组件实例的代理或组件实例
 */
export function useExpose(keyRef: string, componentInstancePropName?: string) {
    const vm = getCurrentInstance()

    if (!vm) {
        throw new Error('useExpose must be used within a component')
    }

    const componentInstance = ref<any>(keyRef)

    const proxy = new Proxy(
        {},
        {
            get(_, key: string | symbol) {
                return Reflect.get(componentInstance.value, key)
            },
            has(_, key: string | symbol) {
                return Reflect.has(componentInstance.value, key)
            },
            set(_, key: string | symbol, value: any) {
                console.warn(
                    `[useExpose] You cannot make any changes to the instance.`
                )
                return true
            }
        }
    )

    if (componentInstancePropName) {
        vm.exposed![componentInstancePropName] = proxy
    } else {
        vm.exposed = proxy
    }

    return vm.proxy
}
