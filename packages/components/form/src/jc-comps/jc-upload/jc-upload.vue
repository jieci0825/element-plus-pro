<script setup lang="ts">
import Thumb from './thumb.vue'
import Drag from './drag.vue'
import { useAttrs, computed, ref, watch } from 'vue'
import { MyFormItemUploadMode } from '../../form-item.type'
import { ElMessage, ElImageViewer } from 'element-plus'
import type { Component } from 'vue'
import type { FileItem } from './jc-upload.type'
import './jc-upload.scss'
import { isString } from '@coderjc/element-plus-pro-utils'

const attrs: any = useAttrs()

const defaultConfig = {
    accept: 'image/*',
    limit: 10,
    fileSize: 1024 * 1024 * 5, // 5M
    mode: 'thumb',
    multiple: true,
    onExceed: () => {
        ElMessage.warning(`超出文件数量限制，最大数量为：${config.value.limit}`)
    },
    onFileSizeExceed: (file: File) => {
        ElMessage.warning(
            `${file.name} 文件大小超出限制-${formatFileSize(config.value.fileSize)}`
        )
    }
}

function formatFileSize(size: number): string {
    if (size < 1024) {
        return `${size}B`
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)}KB`
    } else {
        return `${(size / 1024 / 1024).toFixed(2)}MB`
    }
}

interface Config {
    accept: string
    limit: number
    fileSize: number
    mode: MyFormItemUploadMode
    multiple: boolean
    onExceed: Function
    onFileSizeExceed: Function
}

const config = computed<Config>(() => {
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

const inputFileRef = ref<HTMLElement | null>(null)
const showPreview = ref(false)
const fileList = ref<FileItem[]>([])
const prevewList = ref<string[]>([])

// 初始化 fileList，从 modelValue 中获取
function initFileList(value: any) {
    if (!value) {
        fileList.value = []
        return
    }

    // 如果是字符串（单个 URL）
    if (isString(value)) {
        fileList.value = [{ url: value }]
        return
    }

    // 如果是字符串数组（多个 URL）
    if (Array.isArray(value)) {
        fileList.value = value.map((item) => {
            if (isString(item)) {
                return { url: item }
            }
            // 如果已经是 FileItem 格式
            return item
        })
        return
    }

    fileList.value = []
}

// 监听 modelValue 变化
watch(
    () => attrs['modelValue'],
    (newValue) => {
        // 只在外部值变化时更新，避免内部上传时的循环更新
        if (newValue !== fileList.value) {
            initFileList(newValue)
        }
    },
    { immediate: true }
)

const fileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files || []

    // 如果本次选择的文件，存在大小不合法，则不添加到fileList中
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!checkFileSize(file)) {
            config.value.onFileSizeExceed(file)
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

    if (isSingle.value) {
        // 如果是单文件上传，则无需判断文件数量，因为会直接替换
    } else if (files.length + fileList.value.length > config.value.limit) {
        config.value.onExceed && config.value.onExceed()
        return
    }

    updateValue()
}

function updateValue() {
    attrs['onUpdate:modelValue'] && attrs['onUpdate:modelValue'](fileList.value)
}

// 校验文件大小
function checkFileSize(file: File) {
    return file.size <= config.value.fileSize
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
    // 如果有 raw 对象，检查是否为图片文件
    if (file.raw) {
        if (isImageFile(file.raw)) {
            prevewList.value[0] = file.url
            showPreview.value = true
        } else {
            ElMessage.warning('该文件不支持预览')
        }
    } else {
        // 如果没有 raw 对象（从 URL 初始化的），直接预览
        prevewList.value[0] = file.url
        showPreview.value = true
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
            @select="inputFileRef && inputFileRef?.click()"
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
