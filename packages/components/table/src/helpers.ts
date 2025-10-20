import { isObject } from '@coderjc/element-plus-pro-utils'

// 递归提取所有配置了 search 的列（包括嵌套列的叶子节点）
export const flattenSearchColumns = (columns: any[]): any[] => {
    const result: any[] = []

    const traverse = (cols: any[]) => {
        cols.forEach((col) => {
            if (isObject(col.search)) {
                // 如果是叶子节点且配置了 search，添加到结果中
                result.push(col)
            }
            if (col.children && col.children.length > 0) {
                // 如果有 children，递归处理子列
                traverse(col.children)
            }
        })
    }

    traverse(columns)
    return result
}
