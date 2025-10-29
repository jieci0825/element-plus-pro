import { isFunction } from '@coderjc/element-plus-pro-utils'
import { reactive, toRefs, watch } from 'vue'

interface Options {
    api: (params: any) => Promise<any>
    initParam: Record<string, any>
    isPageable: boolean
    dataCallBack: (data: any) => any
    requestError: (error: any) => void
    staticData?: any[] // 新增：静态数据
    page?: number // 新增：初始页码
    pageSize?: number // 新增：初始每页条数
}

export function useTable(options: Partial<Options>) {
    const defaultOptions: Options = {
        api: () => Promise.resolve(),
        initParam: {},
        isPageable: true,
        dataCallBack: (data: any) => data,
        requestError: (error: any) => {
            console.error(error)
        },
        staticData: [], // 新增
        page: 1,
        pageSize: 10
    }

    options = { ...defaultOptions, ...options }

    // 判断是否使用静态数据模式
    const isStaticMode = !options.api || !isFunction(options.api)

    const state = reactive<{
        tableData: any[]
        pageable: {
            page: number
            pageSize: number
            total: number
        }
        searchParams: Record<string, any>
        searchInitParams: Record<string, any>
        totalParams: Record<string, any>
        isLoading: boolean
    }>({
        tableData: [],
        pageable: {
            page: options.page || 1,
            pageSize: options.pageSize || 10,
            total: 0
        },
        // 只包含搜索表单的参数
        searchParams: {},
        // 外部传入的初始搜索参数
        searchInitParams: options.initParam || {},
        // 搜索表单+分页
        totalParams: {},
        // loading 状态
        isLoading: false
    })

    /**
     * 根据搜索参数筛选静态数据
     */
    const filterStaticData = (data: any[]): any[] => {
        if (
            !state.searchParams ||
            Object.keys(state.searchParams).length === 0
        ) {
            return data
        }

        return data.filter((item) => {
            // 遍历所有搜索参数，检查每一项是否匹配
            return Object.keys(state.searchParams).every((key) => {
                const searchValue = state.searchParams[key]
                const itemValue = item[key]

                // 如果搜索值为空、null、undefined，则跳过该条件
                if (
                    searchValue === '' ||
                    searchValue === null ||
                    searchValue === undefined
                ) {
                    return true
                }

                // 如果是数组类型（如多选、日期范围等）
                if (Array.isArray(searchValue)) {
                    // 空数组跳过
                    if (searchValue.length === 0) return true

                    // 日期范围筛选
                    if (searchValue.length === 2) {
                        const [start, end] = searchValue
                        if (start && end) {
                            const itemTime = new Date(itemValue).getTime()
                            const startTime = new Date(start).getTime()
                            const endTime = new Date(end).getTime()
                            return itemTime >= startTime && itemTime <= endTime
                        }
                    }

                    // 多选筛选：检查 itemValue 是否在 searchValue 数组中
                    return searchValue.includes(itemValue)
                }

                // 数字类型：精确匹配
                if (typeof searchValue === 'number') {
                    return itemValue === searchValue
                }

                // 布尔类型：精确匹配
                if (typeof searchValue === 'boolean') {
                    return itemValue === searchValue
                }

                // 字符串类型：模糊匹配（不区分大小写）
                if (typeof searchValue === 'string') {
                    const itemStr = String(itemValue || '').toLowerCase()
                    const searchStr = String(searchValue).toLowerCase()
                    return itemStr.includes(searchStr)
                }

                return true
            })
        })
    }

    // 如果是静态数据模式，监听 staticData 的变化
    if (isStaticMode && options.staticData) {
        watch(
            () => options.staticData,
            (newData) => {
                if (Array.isArray(newData)) {
                    // 先进行搜索筛选
                    const filteredData = filterStaticData(newData)

                    if (options.isPageable) {
                        // 前端分页
                        const start =
                            (state.pageable.page - 1) * state.pageable.pageSize
                        const end = start + state.pageable.pageSize
                        state.tableData = filteredData.slice(start, end)
                        state.pageable.total = filteredData.length
                    } else {
                        state.tableData = filteredData
                        state.pageable.total = filteredData.length
                    }
                }
            },
            { immediate: true, deep: true }
        )
    }

    /**
     * 组装最终请求参数：初始参数 + 表单参数 + 可选的分页参数
     */
    const buildTotalParams = () => {
        const mergedParams = {
            ...(state.searchInitParams || {}),
            ...(state.searchParams || {})
        }
        if (options.isPageable) {
            return {
                ...mergedParams,
                page: state.pageable.page,
                pageSize: state.pageable.pageSize
            }
        }
        return mergedParams
    }

    /**
     * 静态数据的前端分页更新
     */
    const updateStaticData = () => {
        if (!isStaticMode || !Array.isArray(options.staticData)) return

        // 先进行搜索筛选
        const filteredData = filterStaticData(options.staticData)

        if (options.isPageable) {
            const start = (state.pageable.page - 1) * state.pageable.pageSize
            const end = start + state.pageable.pageSize
            state.tableData = filteredData.slice(start, end)
            state.pageable.total = filteredData.length
        } else {
            state.tableData = filteredData
            state.pageable.total = filteredData.length
        }
    }

    /**
     * 获取数据（仅在非静态模式下调用）
     */
    const fetchData = async () => {
        // 静态数据模式下不执行请求
        if (isStaticMode) return

        if (!options.api || !isFunction(options.api)) return

        try {
            state.isLoading = true
            const resp = await options.api(state.totalParams)

            let _data = resp.data || resp

            if (isFunction(options.dataCallBack)) {
                _data = options.dataCallBack(_data)
            }

            if (options.isPageable) {
                state.tableData = options.isPageable ? _data.list : _data
                state.pageable.total = _data.total
            } else {
                state.tableData = _data
                state.pageable.total = _data.length
            }
        } catch (error) {
            if (isFunction(options.requestError)) {
                options.requestError(error)
            }
        } finally {
            state.isLoading = false
        }
    }

    /**
     * 表单查询参数发生改变
     */
    const onSearchParamsChange = (params: Record<string, any>) => {
        // 更新当前搜索参数
        state.searchParams = params || {}
        // 搜索条件变化，重置页码
        state.pageable.page = 1
        // 重建最终参数
        state.totalParams = buildTotalParams()

        // 静态模式下进行前端筛选
        if (isStaticMode) {
            updateStaticData()
            return
        }

        fetchData()
    }

    /**
     * 页码值改变
     */
    const onPageChange = (page: number) => {
        state.pageable.page = page
        state.totalParams = buildTotalParams()

        if (isStaticMode) {
            updateStaticData()
        } else {
            fetchData()
        }
    }

    /**
     * 页容量改变
     */
    const onPageSizeChange = (pageSize: number) => {
        state.pageable.page = 1
        state.pageable.pageSize = pageSize
        state.totalParams = buildTotalParams()

        if (isStaticMode) {
            updateStaticData()
        } else {
            fetchData()
        }
    }

    return {
        ...toRefs(state),
        fetchData,
        onSearchParamsChange,
        onPageChange,
        onPageSizeChange
    }
}
