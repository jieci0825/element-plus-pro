<script setup lang="ts">
import { ElButton } from 'element-plus'
import { CirclePlus, EditPen, Delete } from '@element-plus/icons-vue'
import './toolbar.scss'
</script>

<template>
    <div class="pro-table__toolbar--inner">
        <div class="toolbar-left">
            <el-button type="primary" :icon="CirclePlus">新增</el-button>
            <el-button type="primary" plain :icon="EditPen">编辑</el-button>
            <el-button type="danger" plain :icon="Delete">删除</el-button>
        </div>
        <div class="toolbar-right">设置</div>
    </div>
</template>
