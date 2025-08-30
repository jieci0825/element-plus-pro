import type { Component } from 'vue'

export interface HeaderRenderConfig {
    /**
     * @description 渲染函数-优先级低于 slot 配置
     */
    render?: Component
    /**
     * @description 插槽名称
     */
    slot?: string
}

// 表头配置类型 - 支持字符串或渲染配置
export type HeaderConfig = string | HeaderRenderConfig

export type StringOrUndefined = string | undefined
export type ComponentOrUndefined = Component | undefined
