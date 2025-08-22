import { resolve } from 'node:path'
import type { ModuleFormat } from 'rollup'
import { eppOutput } from './utils'
import { PKG_NAME } from './constants'

// export const modules = ['esm', 'cjs'] as const
export const modules = ['esm'] as const
export type Module = (typeof modules)[number]
export interface BuildInfo {
    module: 'ESNext' | 'CommonJS'
    format: ModuleFormat
    ext: 'mjs' | 'cjs' | 'js'
    output: {
        /** e.g: `es` */
        name: string
        /** e.g: `dist/element-plus/es` */
        path: string
    }

    bundle: {
        /** e.g: `element-plus/es` */
        path: string
    }
}

export const buildConfig: Record<Module, BuildInfo> = {
    esm: {
        module: 'ESNext',
        format: 'esm',
        ext: 'mjs',
        output: {
            name: 'es',
            path: resolve(eppOutput, 'es')
        },
        bundle: {
            path: `${PKG_NAME}/es`
        }
    }
    // * 暂时不需要 cjs 格式
    // cjs: {
    //     module: 'CommonJS',
    //     format: 'cjs',
    //     ext: 'js',
    //     output: {
    //         name: 'lib',
    //         path: resolve(eppOutput, 'lib')
    //     },
    //     bundle: {
    //         path: `${PKG_NAME}/lib`
    //     }
    // }
}

export const buildConfigEntries = Object.entries(
    buildConfig
) as BuildConfigEntries

export type BuildConfig = typeof buildConfig
export type BuildConfigEntries = [Module, BuildInfo][]

export const target = 'es2018'
