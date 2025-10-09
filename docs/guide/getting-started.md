# 快速开始

本节将介绍如何在项目中使用 Element Plus Pro。

## 安装

```bash
# 使用 npm
npm install element-plus-pro

# 使用 pnpm
pnpm add element-plus-pro

# 使用 yarn
yarn add element-plus-pro
```

## 完整引入

在 `main.ts` 中引入：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusPro from 'element-plus-pro'
import 'element-plus-pro/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusPro)
app.mount('#app')
```

## 按需引入

按需引入组件：

```ts
import { createApp } from 'vue'
import { ProForm, ProTable } from 'element-plus-pro'

const app = createApp(App)

app.component('ProForm', ProForm)
app.component('ProTable', ProTable)
app.mount('#app')
```

