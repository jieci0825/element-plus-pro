<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { Component } from 'vue'

// 使用 import.meta.glob 预加载所有示例组件
// eager: true 表示同步加载，避免异步问题
// @ts-expect-error - Vite 的 import.meta.glob 在运行时是可用的
const modules = import.meta.glob<{ default: Component }>(
    '../../../examples/**/*.vue',
    { eager: true }
)

const props = defineProps<{
    title?: string
    path: string
    source: string
    highlighted?: string
}>()
const showCode = ref(false)
const copyText = async () => {
    try {
        await navigator.clipboard.writeText(decodeURIComponent(props.source))

        ElMessage.success('复制成功')
    } catch (e) {
        ElMessage.error('复制失败')
    }
}

// 存储加载的组件
const DemoComp = shallowRef<Component | null>(null)

// 根据 path 动态加载对应的组件
watch(
    () => props.path,
    (path) => {
        const matchedKey = Object.keys(modules).find((key) => {
            // 将模块路径标准化进行匹配
            const normalizedKey = key.replace('../../../', '/')
            return normalizedKey === path || key.endsWith(path)
        })

        if (matchedKey) {
            // eager: true 时，modules[matchedKey] 已经是解析后的模块
            DemoComp.value = modules[matchedKey].default
        } else {
            console.error(`示例组件未找到: ${path}`)
            DemoComp.value = null
        }
    },
    { immediate: true }
)

const highlighted = computed(() =>
    props.highlighted
        ? decodeURIComponent(props.highlighted)
        : `<pre><code class=\"language-vue\">${decodeURIComponent(props.source)}</code></pre>`
)
</script>

<template>
    <div class="demo-preview">
        <div class="demo-preview__toolbar">
            <span class="demo-preview__title">{{ props.title }}</span>
            <div class="demo-preview__actions">
                <button @click="copyText" aria-label="复制">
                    <i class="iconfont icon-copy"></i>
                </button>
                <button
                    @click="showCode = !showCode"
                    :aria-label="showCode ? '收起代码' : '查看代码'"
                >
                    <i class="iconfont icon-code"></i>
                </button>
            </div>
        </div>
        <div class="demo-preview__render">
            <ClientOnly>
                <component v-if="DemoComp" :is="DemoComp" />
            </ClientOnly>
        </div>
        <div
            v-if="showCode"
            class="demo-preview__code"
            v-html="highlighted"
        ></div>
    </div>
</template>

<style scoped>
.demo-preview {
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    overflow: hidden;
}
.demo-preview__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: var(--vp-c-bg-soft);
}
.demo-preview__render {
    padding: 16px;
    background: var(--vp-c-bg);
}
.demo-preview__code {
    border-top: 1px solid var(--vp-c-divider);
}
.demo-preview__actions button {
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: var(--vp-c-text-1);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
}
/* iconfont size */
.demo-preview__actions .iconfont {
    font-size: 18px;
}
/* ensure svg inside icon renders under scoped css */
.demo-preview__actions :deep(svg) {
    width: 1.5em;
    height: 1.5em;
}
</style>
