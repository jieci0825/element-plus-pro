<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'

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
const DemoComp = defineAsyncComponent(
    () => import(/* @vite-ignore */ props.path)
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
                <component :is="DemoComp" />
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
