# Table 表格

高级表格组件，支持搜索、分页、列控制等功能。

## 基础用法

```vue
<template>
  <pro-table :columns="columns" :data="tableData" />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' }
])

const tableData = ref([
  { name: '张三', age: 18 },
  { name: '李四', age: 20 }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列配置 | `ColumnConfig[]` | - |
| data | 表格数据 | `array` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| selection-change | 选择项发生变化时触发 | `(selection: any[]) => void` |

