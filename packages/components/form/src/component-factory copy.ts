import { h, defineComponent } from 'vue'
import {
    ElInput,
    ElSelect,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
    ElSwitch,
    ElDatePicker,
    ElTimePicker,
    ElCascader
} from 'element-plus'
import { EProFormItemType } from './form'
import { isFunction, isString } from '@jc/element-plus-pro-utils'

// 组件配置接口
interface ComponentConfig {
    component: any
    children?: (props: any) => any[]
    transformProps?: (props: any) => any
}

function processChildCompLable(label: any) {
    if (isString(label)) {
        return () => label
    }
    if (isFunction(label)) {
        return {
            default: label
        }
    }
}

function formatOptions(options: any) {
    const _options = { ...options }
    if (!isString(options.label)) {
        delete _options.label
    }
    _options.key = options.value
    _options.value = options.value
    return _options
}

// 组件配置映射
const componentConfigs: Record<string, ComponentConfig> = {
    [EProFormItemType.INPUT]: {
        component: ElInput
    },

    [EProFormItemType.SELECT]: {
        component: ElSelect,
        children: (props) => {
            const options = props.options || []
            return options.map((option: any) =>
                h(ElOption, {
                    ...option,
                    key: option.value,
                    label: option.label,
                    value: option.value
                })
            )
        }
    },

    [EProFormItemType.RADIO]: {
        component: ElRadioGroup,
        children: (props) => {
            const options = props.options || []
            return options.map((option: any) =>
                h(
                    ElRadio,
                    formatOptions(option),
                    processChildCompLable(option.label)
                )
            )
        }
    },

    [EProFormItemType.CHECKBOX]: {
        component: ElCheckboxGroup,
        children: (props) => {
            const options = props.options || []
            return options.map((option: any) =>
                h(
                    ElCheckbox,
                    {
                        ...option,
                        key: option.value,
                        value: option.value
                    },
                    () => option.label
                )
            )
        }
    },

    [EProFormItemType.SWITCH]: {
        component: ElSwitch
    },

    [EProFormItemType.DATE]: {
        component: ElDatePicker,
        transformProps: (props) => ({
            ...props,
            type: props.dateType || 'date'
        })
    },

    [EProFormItemType.TIME]: {
        component: ElTimePicker
    },

    [EProFormItemType.DATETIME]: {
        component: ElDatePicker,
        transformProps: (props) => ({
            ...props,
            type: 'datetime'
        })
    },

    [EProFormItemType.CASCADER]: {
        component: ElCascader
    }
}

// 组件工厂函数
export function createFormComponent(type: string) {
    const config = componentConfigs[type]

    if (!config) {
        console.warn(`未找到类型为 ${type} 的组件配置，使用默认的 ElInput`)
        return ElInput
    }

    // 如果是简单组件，直接返回
    if (!config.children && !config.transformProps) {
        return config.component
    }

    // 如果是复杂组件，返回一个包装组件
    return defineComponent({
        name: `ProForm${type.charAt(0).toUpperCase()}${type.slice(1)}`,
        props: ['modelValue', 'options'],
        emits: ['update:modelValue'],
        setup(props, { emit, attrs }) {
            return () => {
                const transformedProps = config.transformProps
                    ? config.transformProps({ ...props, ...attrs })
                    : { ...props, ...attrs }

                const children = config.children
                    ? config.children({ ...props, ...attrs })
                    : undefined

                return h(
                    config.component,
                    {
                        ...transformedProps,
                        'onUpdate:modelValue': (value: any) =>
                            emit('update:modelValue', value)
                    },
                    children ? { default: () => children } : undefined
                )
            }
        }
    })
}

// 导出所有组件映射
export const FormItemCompMap = Object.keys(componentConfigs).reduce(
    (map, type) => {
        map[type] = createFormComponent(type)
        return map
    },
    {} as Record<string, any>
)
