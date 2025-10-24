import DefaultTheme from 'vitepress/theme'
import DemoPreview from './components/demo-preview.vue'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusPro from '@coderjc/element-plus-pro'

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp?.(ctx)
        const { app } = ctx
        app.use(ElementPlus)
        app.use(ElementPlusPro as any)
        app.component('DemoPreview', DemoPreview)
    }
}
