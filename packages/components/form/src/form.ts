import type { ExtractPropTypes } from 'vue'

const proFormProps = {
    /**
     * @description 消息
     */
    message: {
        type: String,
        required: true
    },

    /**
     * @description 测试属性
     */
    test: {
        type: String,
        default: 'test'
    }
} as const

export type ProFormProps = ExtractPropTypes<typeof proFormProps>
