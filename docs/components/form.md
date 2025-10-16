# Form 表单

高级表单组件，支持配置化生成表单。

## 基础用法

:::demo /examples/form/basic.vue 基础用法
:::

## ProForm API

### 属性

#### ProForm

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| modelValue | 表单数据 |  ^[object]`Record<string, any>` | `--` | ❌ |
| formItems | 表单项配置 | ^[array]`ProFormItemConfig[]` | `[]` | ❌ |
| gutter | 表单项间距 | `number` | `0` | ❌ |
| col | 表单项所占栅格数 | ^[object]`ColProps` | `{ span: 24 }` | ❌ |
| footerConfig | 页脚配置 | ^[T]`ProFormFooterConfig \| false` | `--` | ❌ |

其余属性将透传给 `ElForm`。

#### ProFormItemConfig

> 由公共字段 + 各类型专属字段组成（即不同的 type 对应的ElementPlus 的组件）；对于具体输入组件，支持两种方式传入其 Props：
> - 顶层直接写（与该类型对应的 Element Plus 组件 Props，已接管的 `modelValue` 等会被忽略）
> - 通过当前项的 `props` 字段传入（同样会忽略 `modelValue` 等）

:::danger type 为 upload 时
当 type 为 upload 时，会存在一些区别，并没有全面继承 ElementPlus 的属性，而是简单的限制了一些
:::

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| label | 表单名称 | `string \| Component` | `--` | ✅ |
| type | 表单项类型 | ^[enum]`input \| password \| input_number \| textarea \| select \| group_select \| radio \| radio_button \| checkbox \| checkbox_button \| switch \| upload \| cascader \| color \| year \| month \| date \| dates \| datetime \| week \| datetimerange \| daterange \| monthrange` | `input` | ❌ |
| key | 表单 key | `string` | `--` | ✅ |
| hideLabel | 隐藏 label | `boolean` | `--` | ❌ |
| tooltip | 提示信息（仅 label 为文本时生效） | `string` | `--` | ❌ |
| hidden | 隐藏表单项 | `boolean` | `--` | ❌ |
| elSlots | 透传给 `ElFormItem` 的插槽 | `Record<string, Function \| string>` | `--` | ❌ |
| customSlot | 启用自定义插槽（插槽名默认取当前项 `key`） | `boolean` | `--` | ❌ |
| col | 表单项所占栅格（优先于 `ProForm` 的 `col`） | `Partial<ColProps>` | `--` | ❌ |
| props | 如类型为 input 时就会传递给 ElInput | ^[object]`继承 ElementPlus 对应组件的类型` | `--` | ❌ |

#### type 为 upload 专属
| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| mode | 上传模式 | ^[enum]`drag(拖拽) \| thumb(缩略图)` | `thumb` | ✅ |
| accept | 接受的文件类型，同原生 accept | `string` | `image/*` | ❌ |
| size | 文件大小限制 | `number` | `5m` | ❌ |
| limit | 文件数量限制 | `number` | `10` | ❌ |
| multiple | 是否多选 | `boolean` | `false` | ❌ |
| onExceed | 超出数量回调 | ^[function]`(currentFiles: File[], files: File[]) => void` | `--` | ❌ |
| tip | 提示文本（仅 drag 模式生效） | `string` | `--` | ❌ |



### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 表单数据更新时触发 | `(value: object) => void` |
| submit | 提交时触发 | `(value: any, errInfo: any) => void` |
| reset | 重置时触发 | `() => void` |
