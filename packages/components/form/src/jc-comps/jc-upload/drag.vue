<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { omit } from '@coderjc/element-plus-pro-utils'
import { useAttrs, ref } from 'vue'
import { ElUpload, ElIcon } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const attrs: any = useAttrs()
const props = defineProps(['limit', 'tip', 'multiple', 'accept'])

const fileList = ref<UploadUserFile[]>([])

const handleChange: UploadProps['onChange'] = (_file, uploadFiles) => {
    fileList.value = uploadFiles
    updateValue()
}

const handleRemove = () => {
    setTimeout(() => {
        updateValue()
    }, 0)
}

function updateValue() {
    const files = fileList.value.map((item) => {
        return { raw: item.raw, url: URL.createObjectURL(item.raw!) }
    })
    attrs['onUpdate:modelValue'] && attrs['onUpdate:modelValue'](files)
}

const handleExceed = () => {
    attrs['onExceed'] && attrs['onExceed']()
}
</script>

<template>
    <div style="width: 100%">
        <el-upload
            v-bind="omit(props, ['tip'])"
            v-model:file-list="fileList"
            drag
            action="#"
            show-file-list
            :auto-upload="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽文件到此处上传 或者 <em>点击上传</em>
            </div>
            <template v-if="props.tip" #tip>
                <div class="el-upload__tip">
                    {{ props.tip }}
                </div>
            </template>
        </el-upload>
    </div>
</template>
