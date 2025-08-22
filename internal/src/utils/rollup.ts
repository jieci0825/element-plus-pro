import { eppPackageJson } from './path'
import { getPackageDependencies } from './pkg'
import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
    // 获取依赖数据
    const { dependencies, peerDependencies } =
        getPackageDependencies(eppPackageJson)

    return (id: string) => {
        const packages: string[] = [...peerDependencies]
        /**
         * 添加 @vue 的原因：
         *  - vue 的这个包在 package.json 中定义的依赖是显示 "vue": "^3.0.0", 这种形式
         *  - 但是实际在项目中可能出现这个用法，引入的包是 @vue/shared @vue/reactivity 等等
         *  - 所以当一个依赖以 @vue 开头的时候，也认为它是外部依赖
         */
        if (!options.full) {
            packages.push('@vue', ...dependencies)
        }

        // @ts-ignore
        return [...new Set(packages)].some(
            (pkg) => id === pkg || id.startsWith(`${pkg}/`)
        )
    }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
    return Promise.all(options.map((option) => bundle.write(option)))
}
