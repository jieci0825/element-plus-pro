<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { TxtCellTypeProps } from '../table-cell.type'
import { DocumentCopy } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

const props = defineProps({
    scoped: {
        type: null as unknown as PropType<any>,
        default: undefined
    },
    prop: {
        type: [String, Number],
        required: true
    },
    cellOpt: {
        type: Object as PropType<TxtCellTypeProps>,
        required: true
    }
})

const cellData = computed(() => {
    return props.scoped.row[props.prop]
})

const className = computed(() => {
    return ['txt-cell', props.cellOpt.isCopy ? 'is--copy' : '']
})

const { copy } = useClipboard({ legacy: true })

const handleCopy = async () => {
    await copy(cellData.value).catch((e) => {
        ElMessage.error('复制失败')
    })
    ElMessage.success('复制成功')
}
</script>

<template>
    <span :class="className">
        <el-icon @click="handleCopy" v-if="cellOpt.isCopy">
            <DocumentCopy />
        </el-icon>
        {{ cellOpt.isCopy ? '&nbsp;&nbsp;&nbsp;' : '' }}
        {{ cellData }}
    </span>
</template>

<style scoped lang="scss">
.txt-cell {
    width: 100%;
    height: 100%;
    font-size: inherit;
    vertical-align: middle;
    position: relative;

    .el-icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
}
</style>
