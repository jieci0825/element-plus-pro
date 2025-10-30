---
title: ProTable 表格
---

# ProTable 表格

ProTable 是对 ElementPlus Table 的高级封装，提供了更简洁的 API 和更丰富的功能，包括搜索区域、工具栏、分页等，让你能够快速搭建复杂的表格页面。

## 基础用法

只需传递 `requestApi` 请求函数和 `tableColumns` 列配置，即可轻松完成一个具备搜索区域、表格区域、分页区域的页面。

:::demo /examples/pro-table/basic.vue 基础用法
:::

## 展示静态数据

如果不需要请求接口，可以直接通过 `data` 属性传递静态数据。设置 `:pagination="false"` 可以关闭分页功能。

:::demo /examples/pro-table/static-data.vue 展示静态数据
:::

## 不同类型的单元格

通过列配置中的 `cell` 属性，可以设置不同类型的单元格。支持图片、开关、输入框、下拉选择等预设类型，也支持通过 `slot` 插槽或 `render` 函数自定义渲染。这两者的级别**同时高于**预设单元格类型。


:::demo /examples/pro-table/cell-types.vue 不同类型的单元格
:::

## 自定义表头

表头支持两种自定义方式：通过 `render` 函数或通过插槽（`slot`）。在列配置的 `label` 属性中传递配置对象即可。`render` 优先级**低于** `slot` 配置。

:::demo /examples/pro-table/custom-header.vue 自定义表头
:::

## 操作列

通常情况下，操作列最常见的按钮就是编辑和删除，所以针对这个情况，我单独做了一个操作列的配置。

:::demo /examples/pro-table/operation-column.vue 操作列
:::


## ProTable API

### 属性

#### ProTable

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| data | 表格数据（静态数据时使用） | ^[array]`any[]` | `[]` | ❌ |
| tableColumns | 表格列配置 | ^[array]`ProTableColumnType[]` | `[]` | ✅ |
| operationColumn | 操作列配置，在表格末尾添加操作列 | ^[object]`OperationColumnConfig` | `--` | ❌ |
| align | 全局对齐方式 | ^[enum]`left \| center \| right` | `center` | ❌ |
| requestApi | 请求表格数据的 API 函数 | ^[function]`(params: any) => Promise<any>` | `--` | ❌ |
| requestAuto | 是否自动执行请求 | `boolean` | `true` | ❌ |
| requestError | 表格 API 请求错误监听 | ^[function]`(params: any) => void` | `--` | ❌ |
| dataCallback | 返回数据的回调函数，可对数据进行处理 | ^[function]`(data: any) => any` | `--` | ❌ |
| componentStyle | 组件风格 | ^[enum]`'' \| 'card'` | `card` | ❌ |
| pagination | 是否需要分页 | `boolean` | `true` | ❌ |
| title | 表格标题 | `string` | `''` | ❌ |
| showHeader | 是否显示 Header 部分 | `boolean` | `true` | ❌ |
| toolButton | 功能按钮配置 | ^[array\|boolean]`('refresh' \| 'setting' \| 'search')[] \| boolean` | `['refresh', 'setting', 'search']` | ❌ |
| initParams | 查询初始参数 | ^[object]`Record<string, any>` | `{}` | ❌ |
| selection | 是否开启多选 | `boolean` | `false` | ❌ |
| loading | 是否显示加载状态 | `boolean` | `true` | ❌ |
| page | 初始页码 | `number` | `1` | ❌ |
| pageSize | 初始每页显示条数 | `number` | `10` | ❌ |
| pageSizes | 每页显示个数选择器的选项设置 | ^[array]`number[]` | `[10, 25, 50, 100]` | ❌ |

其余属性将透传给 `ElTable`。

#### ProTableColumnType

表格列配置，继承自 `ElTableColumn` 的属性，并扩展了以下属性：

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| label | 列名-表头显示的名称 | ^[string\|object]`string \| HeaderConfig` | `--` | ❌ |
| prop | 字段名-对应数据中的字段名 | `string` | `--` | ❌ |
| cell | 单元格配置 | ^[T]`CellConfig` | `--` | ❌ |
| hidden | 是否隐藏该列 | `boolean` | `false` | ❌ |
| align | 对齐方式 | ^[enum]`left \| center \| right` | 继承全局 | ❌ |
| search | 搜索配置 | ^[object]`SearchType` | `--` | ❌ |
| children | 子列（多级表头） | ^[array]`ProTableColumnType[]` | `--` | ❌ |

其余属性同 `ElTableColumn`。

#### HeaderConfig

自定义表头配置：

| 参数 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| render | 渲染函数（优先级低于 slot） | ^[function]`() => Component` | ❌ |
| slot | 插槽名称 | `string` | ❌ |

#### CellConfig

单元格配置，支持以下几种形式：

1. **预设类型字符串**：直接传递类型名称，如 `'txt'`、`'image'`、`'switch'` 等
2. **配置对象**：传递包含 `cellType` 的配置对象，可设置更多属性
3. **自定义渲染**：传递包含 `render` 或 `slot` 的对象

**预设单元格类型：**

| 类型 | 说明 | 配置属性 |
| --- | --- | --- |
| txt | 文本单元格 | `formatValue`、`isCopy`（开启复制功能） |
| image | 图片单元格 | `width`、`height`、`isCircle`、`errorSlot` |
| switch | 开关单元格 | `size`、`inactiveColor`、`activeColor`、`activeText`、`inactiveText` |
| input | 输入框单元格 | `size`、`placeholder`、`disabled` |
| input_number | 计数器单元格 | `size`、`min`、`max`、`step`、`disabled` |
| select | 下拉选择单元格 | `options`、`multiple`、`size`、`disabled` |
| progress | 进度条单元格 | 继承 `ElProgress` 属性 |
| enum | 枚举单元格 | `valueEnum`、`render` |

**自定义渲染配置：**

| 参数 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| render | 渲染函数（优先级低于 slot） | ^[function]`(row: any) => Component` | ❌ |
| slot | 插槽名称 | `string` | ❌ |

#### SearchType

搜索配置对象：

| 参数 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| type | 搜索类型 | ^[enum]`input \| select \| date \| daterange` 等 | ✅ |
| options | 下拉选项（type 为 select 时） | ^[array]`{ label: string, value: any }[]` | ❌ |

其他属性根据 `type` 类型对应 ElementPlus 相应组件的属性。

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cellChange | 单元格值变化时触发 | `(row: Record<string, any>, column: ProTableColumnType, newValue: any) => void` |

其余事件将透传给 `ElTable`。

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| [prop] | 自定义单元格内容（动态插槽名，对应列的 prop） | `{ row, column, $index }` |
| [prop]Header | 自定义表头内容（动态插槽名，对应列的 prop + 'Header'） | `{ column, $index }` |

## 数据说明

本文档示例所使用的假数据位于 `/docs/examples/pro-table/data.js`，包含：

- `mockUserList`：用户数据数组
- `getUserList(params)`：模拟 API 请求函数

你可以直接引入使用：

```javascript
import { mockUserList, getUserList } from './data.js'
```
