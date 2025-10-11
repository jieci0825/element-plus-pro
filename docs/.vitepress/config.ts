import { defineConfig } from 'vitepress'
import { demoContainer } from './plugins/demo-container'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Element Plus Pro',
    description: 'A Vue3 component library based on Element Plus',
    markdown: {
        config(md) {
            demoContainer(md)
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

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/introduction' },
            { text: '组件', link: '/components/form' }
        ],

        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '介绍', link: '/guide/introduction' },
                    { text: '快速开始', link: '/guide/getting-started' }
                ]
            },
            {
                text: '组件',
                items: [
                    { text: 'Form 表单', link: '/components/form' },
                    { text: 'Table 表格', link: '/components/table' },
                    { text: 'Drawer 抽屉', link: '/components/drawer' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
