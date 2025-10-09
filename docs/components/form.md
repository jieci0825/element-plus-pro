# Form 表单

高级表单组件，支持配置化生成表单。

## 基础用法

```vue
<template>
  <pro-form :config="formConfig" v-model="formData" />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})
const formConfig = ref({
  // 表单配置
})
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 表单配置 | `FormConfig` | - |
| modelValue | 表单数据 | `object` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 表单数据更新时触发 | `(value: object) => void` |

