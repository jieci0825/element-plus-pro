import { defineConfig } from 'vitepress'
import { demoContainer } from './plugins/demo-container'
import { inlineTooltip } from './plugins/inline-tooltip'
import { genNavs } from 'vitepress-gen-navs'

const { nav, sidebar } = genNavs({
    dir: './document',
    nav: {
        depth: 1
    }
})

export default defineConfig({
    title: 'Element Plus Pro',
    description: 'A Vue3 component library based on Element Plus',
    srcDir: './document',
    head: [
        [
            'link',
            {
                rel: 'icon',
                type: 'image/svg+xml',
                href: '/images/hero-light.svg'
            }
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                href: '//at.alicdn.com/t/c/font_5038042_3ca1x4lvz3d.css'
            }
        ]
    ],
    markdown: {
        config(md) {
            demoContainer(md, { srcDir: './document' })
            inlineTooltip(md)
        }
    },
    vite: {
        server: {
            port: 5651,
            fs: {
                allow: ['..']
            }
        }
    },
    themeConfig: {
        outline: {
            level: 'deep',
            label: '页面导航'
        },
        nav,
        sidebar,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
