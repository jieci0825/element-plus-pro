<script setup>
import { ref } from 'vue'

const formData = ref({})
const formConfig = ref({})
</script>

<template>
    <pro-form :config="formConfig" v-model="formData" />
</template>
