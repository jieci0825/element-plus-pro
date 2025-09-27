import type { Component } from 'vue'
import type {
    MyFormItemPropsByInputWithTopLevel,
    MyFormItemPropsByInputNumber,
    MyFormItemPropsBySelectWithTopLevel,
    MyFormItemPropsBySwitchWithTopLevel,
    MyFormItemPropsByCascaderWithTopLevel,
    MyFormItemPropsByDatePickTypeWithTopLevel
} from '../../../form'

interface BaseSearchType {
    label?: string | Component
}

interface InputSearchType
    extends BaseSearchType,
        MyFormItemPropsByInputWithTopLevel {}
interface InputNumberSearchType
    extends BaseSearchType,
        MyFormItemPropsByInputNumber {}
interface SelectSearchType
    extends BaseSearchType,
        MyFormItemPropsBySelectWithTopLevel {}
interface SwitchSearchType
    extends BaseSearchType,
        MyFormItemPropsBySwitchWithTopLevel {}
interface CascaderSearchType
    extends BaseSearchType,
        MyFormItemPropsByCascaderWithTopLevel {}
interface DatePickSearchType
    extends BaseSearchType,
        MyFormItemPropsByDatePickTypeWithTopLevel {}

// 搜索类型联合类型
export type SearchType =
    | InputSearchType
    | InputNumberSearchType
    | SelectSearchType
    | SwitchSearchType
    | CascaderSearchType
    | DatePickSearchType
