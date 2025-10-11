import type MarkdownIt from 'markdown-it'

/**
 * 将紧邻语法 "^[xxx]`...`" 转换为带有 Element Plus Tooltip 的徽章：
 * - 方括号内任意内容作为徽章文本（自动 trim），默认 "type"；
 * - 仅当 '^[' 开头、']' 结尾且位于文本 token 末尾，且紧随其后为 code_inline token 时触发。
 */
export function inlineTooltip(md: MarkdownIt) {
    md.core.ruler.after('inline', 'inline-enum-tooltip', (state) => {
        const tokens = state.tokens
        for (let i = 0; i < tokens.length; i++) {
            const blockToken = tokens[i]
            if (blockToken.type !== 'inline' || !blockToken.children) continue

            const children = blockToken.children
            for (let j = 0; j < (children?.length ?? 0) - 1; j++) {
                const a = children[j]
                const b = children[j + 1]

                if (a.type !== 'text' || b.type !== 'code_inline') continue

                // 匹配以 ^[xxx] 结尾（xxx 不含右中括号），需与后续 code_inline 紧邻
                const text = a.content
                const match = text.match(/\^\[([^\]]+)\]$/)
                if (!match) continue

                const full = match[0]
                const labelRaw = match[1]
                const before = text.slice(0, text.length - full.length)
                const label = (labelRaw ?? '').trim()
                const labelEscaped = md.utils.escapeHtml(label || 'type')
                const tooltip = b.content
                const html =
                    `<el-tooltip placement="top" effect="dark">` +
                    `<template #content><code>${md.utils.escapeHtml(tooltip)}</code></template>` +
                    `<span class="ep-inline-enum">${labelEscaped}</span>` +
                    `</el-tooltip>`

                // 就地替换，避免大范围 splice 带来的光标位移
                a.content = before
                b.type = 'html_inline'
                b.tag = ''
                b.content = html
                // @ts-expect-error markdown-it Token 类型
                b.children = null
            }
        }
    })
}
