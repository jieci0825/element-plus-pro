import { series } from 'gulp'
import {
    eppRoot,
    excludeFiles,
    generateExternal,
    pkgRoot,
    withTaskName,
    writeBundles
} from '../utils'
import { glob } from 'fast-glob'
import VueMacros from 'unplugin-vue-macros/rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { buildConfigEntries, target } from '../build-info'
import type { OutputOptions, Plugin } from 'rollup'
import { rollup } from 'rollup'

const plugins: Plugin[] = [
    // Vue 宏处理，支持 Vue SFC 和 JSX
    VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
            vue: vue({
                isProduction: true,
                template: {
                    compilerOptions: {
                        hoistStatic: false,
                        cacheHandlers: false
                    }
                }
            }),
            vueJsx: vueJsx()
        }
    }) as unknown as Plugin,
    // Node 模块解析-处理引用
    nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    // CommonJS 模块转换
    commonjs(),
    // 快速编译和压缩
    esbuild({
        sourceMap: true,
        target,
        loaders: {
            '.vue': 'ts'
        },
        define: {
            'process.env.NODE_ENV': '"production"'
        }
    })
]

async function buildModulesComponents() {
    // 过滤文件-获得所有需要打包的组件源代码文件路径数组，即排除 test node_modules等目录下的文件
    //  - 这样可以将每一个文件都作为一个入口文件，进行单独打包
    const input = excludeFiles(
        await glob(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
            cwd: pkgRoot,
            absolute: true, // 返回绝对路径
            onlyFiles: true // 只返回文件，不包括目录
        })
    )

    const bundle = await rollup({
        input,
        plugins,
        // 标记外部依赖，这些依赖不会被打包进最终文件
        //  - 设置为 false 表示是模块构建，不会将引入的依赖打包进来。
        //  - 这里其实就是所有的模块都不会引入
        external: await generateExternal({ full: false }),
        // 表示模块没有副作用，可以安全地进行 tree shaking
        treeshake: { moduleSideEffects: false }
    })

    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                // 暂时不打包 cjs 格式，所以这里设置为 undefined
                // exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: eppRoot,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`
            }
        })
    )
}

export const buildModules = series(
    withTaskName('buildModulesComponents', buildModulesComponents)
    // 可扩展
)
