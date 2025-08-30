import type { ExtractPropTypes } from 'vue'

// 定义描述vue组件构造函数类型
export interface Constructor<P = any> {
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
    new (...args: any[]): {
        $props: P
    }
}

/**
 * 条件类型-用于从多种形式的组件定义中提取 props 类型
 */
// 情况一：T extends Constructor<infer P> ? P，如果 T是 Constructor类型（即 Vue 组件构造函数），则使用 infer P提取出构造函数中的 P类型（即 props 类型）并返回
// 情况二：T extends { props: infer PropsDef } ? ExtractPropTypes<PropsDef>，选项式 API 形式。如果 T是一个包含 props字段的对象（Vue 选项式 API），则按照下面两步进行处理：
//  1. 使用 infer PropsDef 提取 props 字段的类型
//  2. 使用 ExtractPropTypes 将 PropsDef 转换为真正的 props 类型
// 情况三：T extends (props: infer Props, ...args: any[]) => any ? Props，函数式组件形式。如果 T是一个函数（函数式组件），则提取第一个参数 props的类型。
// end：如果以上都不匹配，返回空对象类型 {}。
export type ExtractProps<T> =
    T extends Constructor<infer P>
        ? P
        : T extends { props: infer PropsDef }
          ? ExtractPropTypes<PropsDef>
          : T extends (props: infer Props, ...args: any[]) => any
            ? Props
            : {}
