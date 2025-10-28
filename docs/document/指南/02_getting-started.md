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
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusPro)
app.mount('#app')
```

## 按需引入

在 `main.ts` 中引入样式文件：

```ts
import { createApp } from 'vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.mount('#app')
```

在需要使用的地方引入组件：
```vue
<script setup>
import { ProForm } from '@coderjc/element-plus-pro'

// ...省略 ProForm 传递的配置，具体在组件文档中查看
</script>

<template>
  <ProForm></ProForm>
</template>
```

