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
| tableHeader | 表格上部分区域的左边部分 | -- |
| toolButton | 即表格上部分区域的右边部分，即默认展示三个工具按钮的位置 | -- |

继承 `ElTable` 的插槽。

## 数据说明

本文档示例所使用的假数据位于 `/docs/examples/pro-table/data.js`，包含：

- `mockUserList`：用户数据数组
- `getUserList(params)`：模拟 API 请求函数

你可以直接引入使用：

```javascript
import { mockUserList, getUserList } from './data.js'
```

:::details 源数据
```js
const mockUserList = [
    {
        id: '9191844e-956d-434f-9bbf-253bdc67f292',
        username: '化国英',
        age: 21,
        address: '东北',
        phone: '10555775065',
        desc: '钟发烧友，教练🥗',
        job: '公司项目分析师',
        email: 'freg6n_kic@qq.com',
        birthday: '1966-01-09 05:54:56',
        avatar: 'https://avatars.githubusercontent.com/u/33738549',
        status: true
    },
    {
        id: '52191bc0-a169-4b83-ba3b-deed8e4b9e33',
        username: '敏秀英',
        age: 51,
        address: '东北',
        phone: '0038-32831413',
        desc: '背焚发烧友，电影制片人',
        job: '主管质量制作人',
        email: 'jwupu5.smn@yahoo.cn',
        birthday: '1995-05-12 07:21:50',
        avatar: 'https://avatars.githubusercontent.com/u/5068070',
        status: false
    },
    {
        id: '4fb8c5ba-f9e5-40fd-9179-7dcd10137f67',
        username: '肥苡沫',
        age: 67,
        address: '华中',
        phone: '15396263370',
        desc: '后果贡献者，爱国者',
        job: '全球品牌建设分析师',
        email: 'gs2m56.fh8@qq.com',
        birthday: '1953-07-30 10:26:45',
        avatar: 'https://avatars.githubusercontent.com/u/10270596',
        status: true
    },
    {
        id: 'f04249e0-4d70-4bfb-ad96-968d70342e34',
        username: '介梓浩',
        age: 61,
        address: '东北',
        phone: '0334-01409477',
        desc: '吸引力爱好者',
        job: '全国性质量策略师',
        email: 'n0emzg_frz23@qq.com',
        birthday: '2006-06-22 02:49:08',
        avatar: 'https://avatars.githubusercontent.com/u/81248465',
        status: true
    },
    {
        id: '627eb7ff-7aae-40d5-bfae-796c1de9cc37',
        username: '储梓诚',
        age: 81,
        address: '西北',
        phone: '0285-42365361',
        desc: '帽子粉丝，摄影爱好者🧃',
        job: '客户项目分析师',
        email: 'k5qsbt.liv92@yahoo.cn',
        birthday: '1953-04-04 15:48:55',
        avatar: 'https://avatars.githubusercontent.com/u/66586900',
        status: false
    },
    {
        id: 'b7a0b515-6915-40c6-a07c-5aea74adfd99',
        username: '舒浩辰',
        age: 42,
        address: '东北',
        phone: '10623459264',
        desc: '教育家，脑力爱好者，创造者🐕‍🦺',
        job: '高级问责制策划师',
        email: 'lmfmhh95@139.com',
        birthday: '1974-09-14 12:37:57',
        avatar: 'https://avatars.githubusercontent.com/u/84301252',
        status: true
    },
    {
        id: '783d78f3-3432-4c2f-9899-cb3b152da2c5',
        username: '官欣怡',
        age: 84,
        address: '华北',
        phone: '12713418501',
        desc: '公众演说家，退伍军人，环保主义者👂🏻',
        job: '直接基础设施助理',
        email: 'ggqryd28@21cn.com',
        birthday: '1962-08-21 13:19:20',
        avatar: 'https://avatars.githubusercontent.com/u/72487355',
        status: true
    },
    {
        id: '93cbcdee-6dae-4b3f-aaa5-21f83b4d3c86',
        username: '智建华',
        age: 22,
        address: '西南',
        phone: '0029-90698030',
        desc: '发明家',
        job: '未来研究代表',
        email: 'tbfv9r.fgw11@qq.com',
        birthday: '2002-02-11 14:31:56',
        avatar: 'https://avatars.githubusercontent.com/u/75792992',
        status: false
    },
    {
        id: '509cec01-248e-4ffb-b593-82d1d2f383a9',
        username: '靳万佳',
        age: 62,
        address: '东北',
        phone: '15102249800',
        desc: '个人，企业家，创始人🏚️',
        job: '全球应用程序设计师',
        email: 'lm1sds.slz7@126.com',
        birthday: '2005-04-15 14:53:42',
        avatar: 'https://avatars.githubusercontent.com/u/23237507',
        status: true
    },
    {
        id: 'fe4fc0a3-7d58-44ee-b3bf-d6338cb889b1',
        username: '俞国英',
        age: 87,
        address: '东北',
        phone: '0179-66423495',
        desc: '客机支持者，旅行家🥍',
        job: '人力解决方案管理员',
        email: 'k8qlqi_idj16@139.com',
        birthday: '1961-12-19 03:08:43',
        avatar: 'https://avatars.githubusercontent.com/u/60940632',
        status: false
    },
    {
        id: 'f20febe4-706d-42df-98c9-fd648570b390',
        username: '委梓豪',
        age: 50,
        address: '华北',
        phone: '18767566506',
        desc: '科学家，朋友，教练👩🏾‍🤝‍👩🏻',
        job: '投资者指令策划师',
        email: 'lmfmhh17@126.com',
        birthday: '1985-05-21 15:05:52',
        avatar: 'https://avatars.githubusercontent.com/u/31849382',
        status: true
    },
    {
        id: '40218853-c5b3-4a4e-8b8e-125834c43843',
        username: '买鹏',
        age: 34,
        address: '华中',
        phone: '0245-16612408',
        desc: '领导者，玩家',
        job: '未来移动性开发员',
        email: 'pybsbt55@hotmail.com',
        birthday: '1998-03-06 10:33:33',
        avatar: 'https://avatars.githubusercontent.com/u/57235425',
        status: false
    },
    {
        id: 'bc424db9-54c5-460f-ad45-a58010556f4a',
        username: '郑涛',
        age: 48,
        address: '西北',
        phone: '020-00702850',
        desc: '飞机发烧友',
        job: '主要数据协调员',
        email: 'i1cvdk.fev@tom.com',
        birthday: '2000-08-08 23:30:18',
        avatar: 'https://avatars.githubusercontent.com/u/63860269',
        status: true
    }
]
```
:::
