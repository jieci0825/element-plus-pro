import type { ExtractPropTypes, PropType } from 'vue'

export const proFormProps = {
    /**
     * @description 消息
     */
    message: {
        type: String as PropType<string>,
        required: true
    },

    /**
     * @description 测试属性
     */
    test: {
        type: String as PropType<string>,
        default: 'test'
    }
} as const

export type ProFormProps = ExtractPropTypes<typeof proFormProps>
