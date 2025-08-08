<template>
  <div class="app-container">
    <h1>系统测试页面</h1>
    <p>如果看到这个页面，说明路由加载正常</p>
    <router-link to="/system/menu">测试菜单管理</router-link>
  </div>
</template>

<script setup>
console.log('测试路由页面加载成功')
</script>