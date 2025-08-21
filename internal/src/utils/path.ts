import { resolve } from 'node:path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const eppRoot = resolve(pkgRoot, 'element-plus-pro')
export const eppPackageJson = resolve(eppRoot, 'package.json')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/element-plus-pro` */
export const eppOutput = resolve(buildOutput, 'element-plus-pro')

// 打包根目录
export const buildRoot = resolve(projRoot, 'internal')
