<script setup>
import { ref } from 'vue'

const formData = ref({})
const formConfig = ref({})
</script>

<template>
    <h1>test</h1>
    <pro-form :config="formConfig" v-model="formData" />
</template>
