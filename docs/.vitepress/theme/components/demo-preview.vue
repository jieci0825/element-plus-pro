<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'

const props = defineProps<{ title?: string; path: string; source: string }>()
const showCode = ref(false)
const copyText = async () => {
    try {
        await navigator.clipboard.writeText(props.source)
    } catch (e) {
        // ignore
    }
}
const DemoComp = defineAsyncComponent(
    () => import(/* @vite-ignore */ props.path)
)
const highlighted = computed(() => decodeURIComponent(props.source))
</script>

<template>
    <div class="demo-preview">
        <div class="demo-preview__toolbar">
            <span class="demo-preview__title">{{ props.title }}</span>
            <div class="demo-preview__actions">
                <button @click="copyText">复制</button>
                <button @click="showCode = !showCode">
                    {{ showCode ? '收起代码' : '查看代码' }}
                </button>
            </div>
        </div>
        <div class="demo-preview__render">
            <ClientOnly>
                <component :is="DemoComp" />
            </ClientOnly>
        </div>
        <div v-if="showCode" class="demo-preview__code">
            <pre><code class="language-vue">{{ highlighted }}</code></pre>
        </div>
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
}
</style>
