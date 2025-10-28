---
title: ProDrawer 抽屉
---


# ProDrawer 抽屉

## 基础用法

```vue
<template>
  <pro-drawer v-model="visible" title="抽屉标题">
    <p>抽屉内容</p>
  </pro-drawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 显示状态变化时触发 | `(value: boolean) => void` |

