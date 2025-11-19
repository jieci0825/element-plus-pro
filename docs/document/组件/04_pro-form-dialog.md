---
title: ProFormDialog 表单对话框
---

# ProFormDialog 表单对话框

`ProFormDialog` 是一个结合了 `ProDialog` 和 `ProForm` 的复合组件，用于快速创建表单对话框场景。

## 设计说明

该组件基于 `ProDialog` 封装，并在内部集成了 `ProForm` 组件，做了以下限制和优化：

### 强制限制

1. **ProForm 的页脚被强制关闭**：组件内部会自动将 `ProForm` 的 `footerConfig` 设置为 `null`，表单提交和重置按钮统一放在对话框底部
2. **ProDialog 的 footer 插槽固定为两个按钮**：默认提供"取消"和"确定"按钮，支持自定义
3. **自动表单验证**：点击"确定"按钮时会自动执行表单验证，验证通过后才会触发 `submit` 事件并关闭对话框

### 继承特性

- **ProDialog 的所有属性**：如 `title`、`width`、`top` 等，通过 `v-bind="$attrs"` 透传
- **ProForm 的配置能力**：通过 `formProps` 属性传递所有 ProForm 的配置
- **插槽支持**：支持 ProForm 的所有自定义插槽，以及自定义 footer 插槽

## 基础用法

基础用法展示了如何使用默认的 footer 按钮。

:::demo /examples/pro-form-dialog/basic.vue 基础用法
:::

## 自定义 Footer

如果默认的"取消"和"确定"按钮不满足需求，可以通过 `footer` 插槽自定义。组件会通过作用域插槽暴露 `handleCancel` 和 `handleSubmit` 方法，你可以自由组合按钮逻辑。

:::demo /examples/pro-form-dialog/custom-footer.vue 自定义 Footer
:::

## 使用表单自定义插槽

支持透传 ProForm 的所有自定义插槽，用于自定义特定表单项的渲染。

:::demo /examples/pro-form-dialog/custom-slot.vue 使用表单自定义插槽
:::

## ProFormDialog API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| modelValue | 控制对话框显示/隐藏 | `boolean` | `false` | ✅ |
| formData | 表单数据（支持 `v-model:formData`） | ^[object]`Record<string, any>` | `--` | ✅ |
| formProps | ProForm 的配置（不包含 `modelValue`） | ^[object]`Omit<ProFormProps, 'modelValue'>` | `--` | ✅ |

其余属性将透传给 `ProDialog`，可参考 [el-dialog](https://element-plus.org/zh-CN/component/dialog) 和 `ProDialog` 的文档。

:::warning 注意
`formProps` 中的 `footerConfig` 配置会被忽略，因为组件内部会强制将其设置为 `null`。如需自定义底部按钮，请使用 `footer` 插槽。
:::

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 对话框显示/隐藏状态改变时触发 | `(value: boolean) => void` |
| update:formData | 表单数据更新时触发 | `(value: Record<string, any>) => void` |
| submit | 表单验证通过并提交时触发（触发后会自动关闭对话框） | `(value: any) => void` |

### 插槽

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| footer | 自定义对话框底部按钮区域 | `{ handleCancel: () => void, handleSubmit: () => void }` |
| [formItemKey] | 透传给 ProForm 的自定义表单项插槽 | `--` |

其他 ProDialog 支持的插槽（如 `header`）也可以正常使用。

### 暴露的方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| proFormInstance | ProForm 实例的代理，可调用表单的所有方法 | `FormInstance` |

#### 示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateRef } from 'vue'

const proFormDialogRef = useTemplateRef('proFormDialogRef')

// 手动触发表单验证
const validate = async () => {
  await proFormDialogRef.value.proFormInstance.validate()
}

// 手动重置表单
const resetForm = () => {
  proFormDialogRef.value.proFormInstance.resetFields()
}
</script>

<template>
  <ProFormDialog ref="proFormDialogRef" ... />
</template>
```

