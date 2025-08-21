import { buildRoot } from './path'
import { run } from './process'

import type { TaskFunction } from 'gulp'

/**
 * 给任意函数添加一个 displayName 属性
 * @description 让 Gulp 在执行时能显示有意义的任务名称，便于调试和日志输出
 */
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => {
    return Object.assign(fn, { displayName: name })
}

// 使用 run
export const runTask = (name: string) =>
    // 为这个任务进行取名（名称并不是强制规范）
    withTaskName(`shellTask:${name}`, () =>
        // * buildRoot 就是打包的根目录
        // - 执行 pnpm run start <name> 的时候，其实调用的就是当前构建根目录下的 pnpm run start 脚本命令
        // - 配置的脚本命令为 "start": "gulp --require tsx/dist/loader.cjs -f gulpfile.ts"
        // - 此时 gulpfile.ts 后面没有跟上 name 名称，所以会执行默认任务。 也就是 gulpfile.ts 中的 export default 任务
        // - 而 pnpm run start <name> 的 name 则会作为参数传递，比如 name 为 buildModules，那么就会执行 gulpfile.ts 中的 buildModules 任务
        // - 也就是命令实际执行为 "gulp --require tsx/dist/loader.cjs -f gulpfile.ts buildModules"
        // - buildModules 实际会从 gulpfile.ts 中找到对应的导出，然后执行
        run(`pnpm run start ${name}`, buildRoot)
    )
