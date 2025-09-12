<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import { SwitchCellTypeProps } from '../../table-cell.type'
import { inject } from 'vue'
import './switch-cell.scss'
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
        type: Object as PropType<SwitchCellTypeProps>,
        required: true
    }
})

const tabelContextInject = inject(tableContextKey)

const data = ref(!!props.scoped.row[props.prop])
watch(
    () => props.scoped.row[props.prop],
    (newValue) => {
        data.value = !!newValue
    }
)

const onChange = () => {
    tabelContextInject?.cellChange(props.scoped.row, props.prop, data.value)
}

const selfAlign = computed(() => {
    const align = tabelContextInject?.tableColumns.find(
        (item) => item.prop === props.prop
    )?.align
    return align
})
</script>

<template>
    <div :class="['switch-cell', selfAlign && `switch-cell--${selfAlign}`]">
        <el-switch
            v-model="data"
            :size="cellOpt.size"
            :inactive-color="cellOpt.inactiveColor"
            :active-color="cellOpt.activeColor"
            :active-text="cellOpt.activeText"
            :inactive-text="cellOpt.inactiveText"
            @change="onChange"
        />
    </div>
</template>
