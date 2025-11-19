<script setup lang="ts">
import { ProFormDialog, ProFormProps } from '@coderjc/element-plus-pro'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

interface FormData {
    title: string
    tags: string[]
    content: string
}

const visible = ref(false)
const formData = ref<FormData>({
    title: '',
    tags: [],
    content: ''
})

const formProps: ProFormProps = {
    formItems: [
        {
            label: '文章标题',
            key: 'title',
            type: 'input',
            required: true
        },
        {
            label: '标签',
            key: 'tags',
            type: 'input',
            customSlot: true // 启用自定义插槽
        },
        {
            label: '文章内容',
            key: 'content',
            type: 'textarea',
            props: {
                rows: 6
            }
        }
    ],
    labelWidth: '100px'
}

const handleOpen = () => {
    visible.value = true
}

const handleSubmit = (data: any) => {
    ElMessage.success('文章保存成功：' + JSON.stringify(data))
}

// 标签相关
const tagInputVisible = ref(false)
const tagInputValue = ref('')
const tagInputRef = ref()

const handleTagClose = (tag: string) => {
    formData.value.tags = formData.value.tags.filter((t) => t !== tag)
}

const showTagInput = () => {
    tagInputVisible.value = true
}

const handleTagInputConfirm = () => {
    if (tagInputValue.value) {
        formData.value.tags.push(tagInputValue.value)
    }
    tagInputVisible.value = false
    tagInputValue.value = ''
}
</script>

<template>
    <div class="container">
        <el-button @click="handleOpen" type="primary"
            >打开自定义插槽对话框</el-button
        >
        <ProFormDialog
            v-model="visible"
            v-model:form-data="formData"
            :form-props="formProps"
            title="发布文章"
            width="700px"
            @submit="handleSubmit"
        >
            <!-- 自定义标签选择器 -->
            <template #tags>
                <div class="tags-container">
                    <el-tag
                        v-for="tag in formData.tags"
                        :key="tag"
                        closable
                        @close="handleTagClose(tag)"
                        style="margin-right: 8px"
                    >
                        {{ tag }}
                    </el-tag>
                    <el-input
                        v-if="tagInputVisible"
                        ref="tagInputRef"
                        v-model="tagInputValue"
                        size="small"
                        style="width: 100px"
                        @keyup.enter="handleTagInputConfirm"
                        @blur="handleTagInputConfirm"
                    />
                    <el-button
                        v-else
                        size="small"
                        @click="showTagInput"
                        :icon="Plus"
                    >
                        添加标签
                    </el-button>
                </div>
            </template>
        </ProFormDialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 400px;
}

.tags-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
