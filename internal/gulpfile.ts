import { resolve, join } from 'node:path'
import { copyFile, mkdir } from 'fs/promises'
import { copy, ensureDir, move, readdir, remove } from 'fs-extra'
import {
    buildOutput,
    eppOutput,
    eppPackageJson,
    projRoot,
    run,
    runTask,
    withTaskName
} from './src'
import { parallel, series, TaskFunction } from 'gulp'
import { buildConfig, Module } from './src/build-info'

export const copyFiles = () => {
    return Promise.all([
        // 复制 package.json
        copyFile(eppPackageJson, resolve(eppOutput, 'package.json')),
        // 复制 README.md
        copyFile(
            resolve(projRoot, 'README.md'),
            resolve(eppOutput, 'README.md')
        )
    ])
}

export const copyTypesDefinitions: TaskFunction = (done) => {
    const src = resolve(buildOutput, 'types', 'packages')
    const copyTypes = (module: Module) =>
        withTaskName(`copyTypes:${module}`, () => {
            // console.log('copy--origin', src)
            // console.log('copy--target', buildConfig[module].output.path)
            return Promise.all([
                copy(
                    src,
                    resolve(buildConfig[module].output.path, 'packages'),
                    {
                        // @ts-ignore
                        recursive: true
                    }
                ),
                // !临时解决方案
                copy(
                    resolve(eppOutput, 'index.d.ts'),
                    resolve(buildConfig.esm.output.path, 'index.d.ts')
                )
            ])
        })

    return parallel(copyTypes('esm'))(done)
}

export async function moveTypesDefinitions() {
    async function _move(module: Module) {
        const sourceDir = resolve(
            buildConfig[module].output.path,
            'element-plus-pro'
        )
        const targetDir = buildConfig[module].output.path
        // 确认目录是否存在
        await ensureDir(sourceDir)
        // 读取源目录中的所有文件和子目录
        const items = await readdir(sourceDir)
        // 移动每个项目到目标目录
        for (const item of items) {
            const sourcePath = join(sourceDir, item)
            const targetPath = join(targetDir, item)

            // 移动文件或目录
            await move(sourcePath, targetPath, { overwrite: true })
        }

        // 删除原目录
        await remove(sourceDir)
    }

    return Promise.all([_move('esm')])
}

export default series(
    // 清空之前的打包文件
    withTaskName('clean', () => run('pnpm run clean')),
    // 创建输出目录
    withTaskName('createOutput', () => mkdir(eppOutput, { recursive: true })),
    // 并行执行多个任务
    parallel(
        // 构建模块
        runTask('buildModules'),
        runTask('generateTypesDefinitions')
    ),

    // 并行复制文件（类型 package.json...）
    parallel(copyTypesDefinitions, copyFiles),
    // 将移动过后的 es 模块下 element-plus-pro 下面的类型定义文件移动到 es 目录下面
    withTaskName('moveTypesDefinitions', moveTypesDefinitions)
)

export * from './src'
