<script setup lang="ts">
import { useAttrs, computed, ref } from 'vue'
import { MyFormItemUploadMode } from '../../form-item.type'
import { ElMessage, ElImageViewer } from 'element-plus'
import type { Component } from 'vue'
import type { FileItem } from './jc-upload.type'
import Thumb from './thumb.vue'
import Drag from './drag.vue'
import './jc-upload.scss'

const attrs: any = useAttrs()

const defaultConfig = {
    accept: 'image/*',
    limit: 10,
    size: 1024 * 1024 * 5, // 5M
    mode: 'thumb',
    multiple: true,
    onExceed: () => {
        ElMessage.warning('超出文件数量限制，最大数量为：' + config.value.limit)
    }
}

const config = computed(() => {
    return { ...defaultConfig, ...attrs }
})
const isSingle = computed(() => {
    return config.value.limit === 1
})

type CompMap = {
    [key in MyFormItemUploadMode]: Component
}
const compMap: CompMap = {
    drag: Drag,
    thumb: Thumb
}

const inputFileRef = ref(null)
const showPreview = ref(false)
const fileList = ref<FileItem[]>([])
const prevewList = ref<string[]>([])

const fileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files

    if (isSingle.value) {
        // 如果是单文件上传，则无需判断文件数量，因为会直接替换
    } else if (files.length + fileList.value.length > config.value.limit) {
        config.value.onExceed && config.value.onExceed()
        return
    }

    // 如果本次选择的文件，存在大小不合法，则不添加到fileList中
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!checkFileSize(file)) {
            continue
        }

        const node = {
            raw: file,
            url: URL.createObjectURL(file)
        }

        if (isSingle.value) {
            fileList.value[0] = node
        } else {
            fileList.value.push(node)
        }
    }

    updateValue()
}

function updateValue() {
    attrs['onUpdate:modelValue'] && attrs['onUpdate:modelValue'](fileList.value)
}

// 校验文件大小
function checkFileSize(file: File) {
    return file.size <= config.value.size
}

// 检测是否为图片文件
function isImageFile(file: File) {
    return file.type.startsWith('image/')
}

// 删除文件
const removeFile = (index: number) => {
    fileList.value.splice(index, 1)
    updateValue()
}

// 预览文件
const previewFile = (index: number) => {
    const file = fileList.value[index]
    if (isImageFile(file.raw)) {
        prevewList.value[0] = file.url
        showPreview.value = true
    } else {
        ElMessage.warning('该文件不支持预览')
    }
}
</script>

<template>
    <div class="jc-upload" @click.stop="1">
        <Component
            v-bind="config"
            v-if="compMap[config.mode]"
            :is="compMap[config.mode]"
            :file-list="fileList"
            @select="inputFileRef.click()"
            @remove="removeFile"
            @preview="previewFile"
        ></Component>

        <input
            type="file"
            style="display: none"
            ref="inputFileRef"
            :accept="config.accept"
            :multiple="config.multiple"
            @change="fileChange"
        />

        <!-- 预览组件-->
        <el-image-viewer
            v-if="showPreview"
            :initial-index="0"
            :url-list="prevewList"
            @close="showPreview = false"
        />
    </div>
</template>
