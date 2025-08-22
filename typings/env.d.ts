import type { vShow, Component } from 'vue'
import type { INSTALLED_KEY } from '@jc/element-plus-pro-constants'

declare global {
    namespace JSX {
        interface IntrinsicAttributes {
            class?: unknown
            style?: unknown
        }
    }
}

declare module 'vue' {
    export interface App {
        [INSTALLED_KEY]?: boolean
    }

    export interface GlobalComponents {
        Component: (props: { is: Component | string }) => void
    }

    export interface ComponentCustomProperties {
        vShow: typeof vShow
    }
}

export {}
