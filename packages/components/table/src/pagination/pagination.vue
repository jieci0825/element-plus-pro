<script setup lang="ts">
import { ElPagination } from 'element-plus'

interface Pageable {
    page: number
    pageSize: number
    total: number
}

interface PaginationProps {
    pageable: Pageable
    pageSizes?: number[]
    handleSizeChange: (size: number) => void
    handleCurrentChange: (currentPage: number) => void
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageSizes: () => [10, 25, 50, 100]
})
</script>

<template>
    <div class="pro-table__pagination--inner">
        <el-pagination
            :background="true"
            :current-page="props.pageable.page"
            :page-size="props.pageable.pageSize"
            :page-sizes="props.pageSizes"
            :total="props.pageable.total"
            layout="total, sizes, ->, prev, pager, next, jumper"
            @size-change="props.handleSizeChange"
            @current-change="props.handleCurrentChange"
        ></el-pagination>
    </div>
</template>
