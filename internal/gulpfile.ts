import { resolve } from 'node:path'
import { copyFile, mkdir } from 'fs/promises'
import {
    eppOutput,
    eppPackageJson,
    projRoot,
    run,
    runTask,
    withTaskName
} from './src'
import { parallel, series } from 'gulp'

export const copyFiles = () => {
    Promise.all([
        // 复制 package.json
        copyFile(eppPackageJson, './dist/package.json'),
        // 复制 README.md
        copyFile(
            resolve(projRoot, 'README.md'),
            resolve(eppOutput, 'README.md')
        )
        // todo 复制类型定义
    ])
}

export default series(
    // 清空之前的打包文件
    withTaskName('clean', () => run('pnpm run clean')),
    // 创建输出目录
    withTaskName('createOutput', () => {
        console.log('createOutput-eppOutput::', eppOutput)
        return mkdir(eppOutput, { recursive: true })
    }),
    // 并行执行多个任务
    parallel(
        // 构建模块
        runTask('buildModules'),
        runTask('generateTypesDefinitions')
    )

    // 并行复制文件（类型 package.json...）
)

export * from './src'
