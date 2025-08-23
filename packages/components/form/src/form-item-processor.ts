import {
    EProFormItemType,
    type ProFormItemType,
    type ProFormProps
} from './form'
import {
    isArray,
    isFunction,
    isObject,
    isString,
    isUndefined
} from '@jc/element-plus-pro-utils'

/**
 * 处理单个表单项-el插槽
 */
function processFormItemElSlots(item: ProFormItemType): void {
    // 如果是 undefined 或 数组，则是错误配置，直接重置为空对象
    if (!item.elSlots || isArray(item.elSlots)) {
        item.elSlots = {}
        return
    }

    if (isFunction(item.elSlots)) {
        // 如果 elSlots 是一个函数，则将其转换为默认插槽
        item.elSlots = {
            default: item.elSlots
        }
        return
    }

    if (isObject(item.elSlots)) {
        // 如果 elSlots 是一个对象，则遍历其属性，如果属性值是字符串，则将其转换为函数
        for (const [key, value] of Object.entries(item.elSlots)) {
            if (isString(value)) {
                item.elSlots[key] = () => value
            }
        }
    }
}

/**
 * 处理单个表单项-默认值
 */
function processFormItemDefaultValue(
    item: ProFormItemType,
    formProps: ProFormProps
): void {
    // 使用对象映射的方式批量设置默认值
    const defaults = {
        customSlot: false,
        hidden: false,
        span: formProps.span || 24,
        type: EProFormItemType.INPUT
    }

    // 批量设置默认值
    Object.entries(defaults).forEach(([key, value]) => {
        if (isUndefined(item[key as keyof ProFormItemType])) {
            ;(item as any)[key] = value
        }
    })

    // 特殊处理：缺少 key 属性的警告
    if (isUndefined(item.key)) {
        // 后续可以考虑 console 被重写/污染 的情况
        console.warn('表单项缺少 key 属性')
    }

    // 特殊处理：label 依赖于 key 的值
    if (isUndefined(item.label)) {
        item.label = item.key
    }
}

const WithProps = [
    'label',
    'key',
    'type',
    'span',
    'hidden',
    'customSlot',
    'elSlots'
]

/**
 * 处理单个表单项-props
 */
function processFormItemProps(item: ProFormItemType): void {
    // 如果不是 undefined，则说明用户主动配置了，无需处理
    if (!isUndefined(item.props)) return

    // 如果是 undefined，则根据当前 item 进行处理
    //  -  即排除 ProFormItemType 本身具备的属性之后，其余的都作为 props 传递给 el 组件
    item.props = omit(item, WithProps)
}

/**
 * 处理单个表单项
 */
function processFormItem(
    item: ProFormItemType,
    formProps: ProFormProps
): ProFormItemType {
    processFormItemDefaultValue(item, formProps)
    processFormItemElSlots(item)
    processFormItemProps(item)
    return item
}

/**
 * 处理表单项列表：过滤隐藏项并处理每个表单项
 */
export function processFormItems(formProps: ProFormProps): ProFormItemType[] {
    const formItems = formProps.formItems || []
    return formItems
        .map((item) => processFormItem(item, formProps))
        .filter((item) => !item.hidden)
}

function omit(obj: Object, keys: string[]) {
    if (obj == null) return {}
    if (!keys || keys.length === 0) return { ...obj }

    const keysSet = new Set(keys)
    const result: any = {}

    for (const [key, value] of Object.entries(obj)) {
        if (!keysSet.has(key)) {
            result[key] = value
        }
    }

    return result
}
