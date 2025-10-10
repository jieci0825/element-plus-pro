import fs from 'node:fs'
import path from 'node:path'
import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

export function demoContainer(md: MarkdownIt) {
    md.use(container, 'demo', {
        render(tokens, idx, _options, env) {
            const token = tokens[idx]
            const isOpening = token.nesting === 1
            if (isOpening) {
                // "demo /examples/foo.vue 可选标题..."
                const info = token.info.trim().slice('demo'.length).trim()
                const [rawPath, ...titleArr] = info.split(/\s+/)
                const title = titleArr.join(' ')
                if (!rawPath) return ''

                const docsRoot = process.cwd()
                const mdFileDir = (env as any).realPath
                    ? path.dirname((env as any).realPath)
                    : path.resolve(
                          docsRoot,
                          path.dirname(((env as any).path as string) || '')
                      )
                const resolved = rawPath.startsWith('/')
                    ? path.resolve(docsRoot, '.' + rawPath)
                    : path.resolve(mdFileDir, rawPath)

                const source = fs.readFileSync(resolved, 'utf-8')
                const encoded = encodeURIComponent(source)
                const publicPath =
                    '/' + path.relative(docsRoot, resolved).replace(/\\/g, '/')

                return `\n<DemoPreview title=${JSON.stringify(title || '')} path=${JSON.stringify(publicPath)} source="${encoded}" />\n`
            } else {
                return ''
            }
        }
    })
}
