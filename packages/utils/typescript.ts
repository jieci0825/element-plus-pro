import type { AppContext, EmitsOptions, Plugin, SetupContext } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

export type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit']

/**
 * 提取组件的 Props 类型
 * 支持类组件和函数式组件
 */
export type ExtractComponentProps<T> = T extends new (...args: any) => {
    $props: infer P
}
    ? Omit<P, keyof import('vue').VNodeProps>
    : T extends (props: infer P, ...args: any) => any
      ? P
      : Record<string, any>
