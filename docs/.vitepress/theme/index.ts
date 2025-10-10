import DefaultTheme from 'vitepress/theme'
import DemoPreview from './components/demo-preview.vue'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusPro from '../../../dist/element-plus-pro/es/index.mjs'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        DefaultTheme.enhanceApp?.({ app })
        app.use(ElementPlus)
        app.use(ElementPlusPro as any)
        app.component('DemoPreview', DemoPreview)
    }
}
