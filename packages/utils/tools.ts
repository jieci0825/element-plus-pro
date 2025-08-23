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
