import fs from 'node:fs'
import path from 'node:path'
import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

/**
 * markdown-it 自定义容器插件：注册名为 'demo' 的容器。
 *
 * 用法（在 Markdown 中）：
 * :::demo /examples/form/basic.vue 可选标题...
 * :::
 *
 * 作用：
 * - 将上述容器语法渲染为文档站点中的 <DemoPreview /> 组件，
 *   以便在文档中展示示例组件及其源码。
 *
 * 渲染流程（开标签时执行，闭标签忽略）：
 * 1. 解析容器信息，提取示例文件路径和可选标题；
 * 2. 解析示例文件的实际绝对路径：
 *    - 以 '/' 开头时，相对 docs 根目录；
 *    - 否则相对当前 Markdown 文件所在目录；
 * 3. 读取示例文件源码，并使用 encodeURIComponent 编码，便于作为属性传递；
 * 4. 计算示例文件的公开访问路径（publicPath），用于在站点中定位该文件；
 * 5. 返回 <DemoPreview title path source /> HTML 字符串，交由主题组件渲染。
 */

interface DemoContainerOptions {
    srcDir?: string
}

export function demoContainer(
    md: MarkdownIt,
    options: DemoContainerOptions = {}
) {
    const { srcDir } = options
    // 注册 'demo' 容器，并提供自定义 render 回调
    md.use(container, 'demo', {
        render(tokens, idx, _options, env) {
            // markdown-it 的 token 序列，当前容器对应的 token
            const token = tokens[idx]
            // nesting === 1 表示开标签，-1 表示闭标签
            const isOpening = token.nesting === 1
            if (isOpening) {
                // 期望语法形如："demo /examples/foo.vue 可选标题..."
                const info = token.info.trim().slice('demo'.length).trim()
                // 第一个参数为示例文件路径，其余部分拼为标题
                const [rawPath, ...titleArr] = info.split(/\s+/)
                const title = titleArr.join(' ')
                // 未提供路径则不渲染任何内容
                if (!rawPath) return ''

                // docs 根目录（当前进程工作目录）
                const docsRoot = process.cwd()
                // 当前 Markdown 文件所在目录：优先使用 env.realPath，其次回退到 env.path 计算
                const mdFileDir = (env as any).realPath
                    ? path.dirname((env as any).realPath)
                    : path.resolve(
                          docsRoot,
                          path.dirname(((env as any).path as string) || '')
                      )
                // 解析示例文件的绝对路径：以 '/' 开头按 docs 根目录解析，否则相对 MD 文件目录解析
                const resolved = rawPath.startsWith('/')
                    ? path.resolve(docsRoot, '.' + rawPath)
                    : path.resolve(mdFileDir, rawPath)

                // 读取示例源码
                const source = fs.readFileSync(resolved, 'utf-8')
                // 原始源码编码，用于复制等功能
                const encoded = encodeURIComponent(source)
                // 使用与 VitePress 一致的高亮器（若存在）在构建期生成 HTML
                const highlightedHtml =
                    typeof md.options.highlight === 'function'
                        ? md.options.highlight(source, 'vue', '')
                        : md.utils.escapeHtml(source)
                const highlightedEncoded = encodeURIComponent(highlightedHtml)

                // 计算对外可访问的路径
                // DemoPreview 组件使用动态 import，需要提供相对于 demo-preview.vue 的路径
                // demo-preview.vue 位于 .vitepress/theme/components/ 下
                const demoPreviewPath = path.resolve(
                    docsRoot,
                    '.vitepress/theme/components/demo-preview.vue'
                )
                const publicPath = path
                    .relative(path.dirname(demoPreviewPath), resolved)
                    .replace(/\\/g, '/')

                // 将数据注入到自定义的 <DemoPreview /> 组件中进行展示
                return `\n<DemoPreview title=${JSON.stringify(title || '')} path=${JSON.stringify(publicPath)} source="${encoded}" highlighted="${highlightedEncoded}" />\n`
            } else {
                // 闭标签不输出任何内容
                return ''
            }
        }
    })
}
