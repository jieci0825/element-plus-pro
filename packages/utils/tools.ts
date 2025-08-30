/**
 * 获取枚举值的联合类型
 * 支持字符串枚举和数字枚举
 */
export type EnumValues<T> =
    T extends Record<string, infer V>
        ? V extends string | number
            ? V
            : never
        : never

export function omit(obj: Object, keys: string[]) {
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

/**
 * 将驼峰命名或帕斯卡命名转换为短横线分隔的命名格式
 * @param str 需要转换的字符串
 * @returns 固定长度为2的数组，[转换后的值, 原值]
 * @example
 * toKebabCase('showOverflowTooltip') // ['show-overflow-tooltip', 'showOverflowTooltip']
 * toKebabCase('ShowOverflowTooltip') // ['show-overflow-tooltip', 'ShowOverflowTooltip']
 * toKebabCase('HTMLElement') // ['html-element', 'HTMLElement']
 */
export function toKebabCase(str: string): [string, string] {
    if (!str) return ['', '']

    const kebabCase = str
        // 在大写字母前插入短横线，但不包括字符串开头
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // 处理连续大写字母的情况，如 HTMLElement -> HTML-Element
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        // 转换为小写
        .toLowerCase()

    return [kebabCase, str]
}
