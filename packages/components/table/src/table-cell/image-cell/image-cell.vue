<script setup lang="ts">
import { computed, PropType } from 'vue'
import { ImageCellTypeProps } from '../../table-cell.type'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ElImage, ElIcon } from 'element-plus'
import { inject } from 'vue'
import './image-cell.scss'
import { tableContextKey } from '../../constants'

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
        type: Object as PropType<ImageCellTypeProps>,
        required: true
    }
})

const tabelContextInject = inject(tableContextKey)

const url = computed(() => {
    return props.scoped.row[props.prop]
})

const styles = computed(() => {
    return {
        width: props.cellOpt.width + 'px',
        height: props.cellOpt.height + 'px',
        zIndex: 5000
    }
})

const isCircle = computed(() => {
    return !!props.cellOpt.isCircle
})

const showErrorSlot = computed(() => {
    return !!props.cellOpt.errorSlot
})

const selfAlign = computed(() => {
    const align = tabelContextInject?.tableColumns.find(
        (item) => item.prop === props.prop
    )?.align
    return align
})
</script>

<template>
    <div
        :class="[
            'image-cell',
            isCircle && 'image-cell--circle',
            selfAlign && `image-cell--${selfAlign}`
        ]"
    >
        <el-image
            :style="styles"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[url]"
            :initial-index="0"
            fit="cover"
            :preview-teleported="true"
        >
            <template #error>
                <Component v-if="showErrorSlot" :is="props.cellOpt.errorSlot" />
                <div class="image-slot" v-else>
                    <el-icon><icon-picture /></el-icon>
                </div>
            </template>
        </el-image>
    </div>
</template>
