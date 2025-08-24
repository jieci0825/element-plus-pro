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
