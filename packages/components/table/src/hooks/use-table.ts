import { isFunction } from '@coderjc/element-plus-pro-utils'
import { reactive, toRefs } from 'vue'

interface Options {
    api: (params: any) => Promise<any>
    initParam: Record<string, any>
    isPageable: boolean
    dataCallBack: (data: any) => any
    requestError: (error: any) => void
}

export function useTable(options: Partial<Options>) {
    const defaultOptions: Options = {
        api: () => Promise.resolve(),
        initParam: {},
        isPageable: true,
        dataCallBack: (data: any) => data,
        requestError: (error: any) => {
            console.error(error)
        }
    }

    options = { ...defaultOptions, ...options }

    const state = reactive({
        tableData: [],
        pageable: {
            page: 1,
            pageSize: 10,
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
     * 获取数据
     */
    const fetchData = async () => {
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
        fetchData()
    }

    /**
     * 页码值改变
     */
    const onPageChange = (page: number) => {
        state.pageable.page = page
        state.totalParams = buildTotalParams()
        fetchData()
    }

    /**
     * 页容量改变
     */
    const onPageSizeChange = (pageSize: number) => {
        state.pageable.page = 1
        state.pageable.pageSize = pageSize
        state.totalParams = buildTotalParams()
        fetchData()
    }

    return {
        ...toRefs(state),
        fetchData,
        onSearchParamsChange,
        onPageChange,
        onPageSizeChange
    }
}
