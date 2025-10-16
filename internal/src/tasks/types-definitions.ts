import { buildOutput, eppRoot, projRoot, run } from '../utils'
import { join } from 'node:path'
import ts from 'typescript'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
// import { glob } from 'fast-glob'

export const generateTypesDefinitions = async () => {
    console.log('Generating types definitions')

    const typesDir = join(buildOutput, 'types', 'packages')
    const entryDir = join(typesDir, 'element-plus-pro')
    const entryFilePath = join(entryDir, 'index.d.ts')
    // 定义最终输出的类型文件路径
    const outputFilePath = join(buildOutput, 'element-plus-pro', 'index.d.ts')
    const tsDir = join(projRoot, 'node_modules', 'typescript')
    const tsConfigPath = join(projRoot, 'tsconfig.web.json')
    const tsConfig = ts.readConfigFile(tsConfigPath, ts.sys.readFile)

    // Generate .d.ts files
    await run(
        'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types'
    )

    // 使用 API Extractor 将所有的 .d.ts 文件打包成一个文件
    const extractorConfig = ExtractorConfig.prepare({
        configObject: {
            projectFolder: typesDir,
            mainEntryPointFilePath: entryFilePath,
            apiReport: {
                enabled: false // 禁用 API 报告生成
            },
            docModel: {
                enabled: false // 禁用 API 文档模型生成
            },
            tsdocMetadata: {
                enabled: false // 禁用 TSDoc 元数据生成
            },
            dtsRollup: {
                enabled: true, // 启用类型文件合并
                untrimmedFilePath: outputFilePath // 输出完整的（未修剪的）类型文件到最终位置
            },
            compiler: {
                overrideTsconfig: {
                    compilerOptions: {
                        lib: tsConfig.config.compilerOptions.lib, // 继承原始的 lib 配置
                        paths: {
                            '@coderjc/element-plus-pro': [entryFilePath], // 路径映射：element-plus-pro -> 主入口文件
                            '@coderjc/element-plus-pro-utils': [
                                `${typesDir}/utils`
                            ],
                            '@coderjc/element-plus-pro-hooks': [
                                `${typesDir}/hooks`
                            ],
                            '@coderjc/element-plus-pro-components': [
                                `${typesDir}/components`
                            ],
                            '@coderjc/element-plus-pro-constants': [
                                `${typesDir}/constants`
                            ]
                        },
                        skipLibCheck: true
                    },
                    include: [typesDir]
                }
            }
        },
        configObjectFullPath: undefined,
        packageJsonFullPath: join(eppRoot, 'package.json')
    })

    const result = Extractor.invoke(extractorConfig, {
        typescriptCompilerFolder: tsDir
    })

    if (result.succeeded) {
        console.log('✅ API Extractor 成功生成类型定义文件:', outputFilePath)
    } else {
        console.error('❌ API Extractor 执行失败')
        console.error(
            '错误信息:',
            result.errorCount,
            '个错误,',
            result.warningCount,
            '个警告'
        )
    }
}
