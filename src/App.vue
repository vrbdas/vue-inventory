<script setup>
import AppImage from './components/AppImage.vue';
import AppInventory from './components/AppInventory.vue';
import AppMessage from './components/AppMessage.vue';
</script>

<template>
  <div class="app-container">
    <AppImage/>
    <AppInventory/>
    <AppMessage/>
  </div>
</template>

<style scoped lang='scss'>
.app-container {
    width: 849px;
    height: 660px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(29, 29, 29);
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr auto;
    gap: 24px;
}
</style>