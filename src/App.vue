<script setup>
import { ref } from 'vue';
import AppImage from './components/AppImage.vue';
import AppInventory from './components/AppInventory.vue';
import AppMessage from './components/AppMessage.vue';

const messageShow = ref(true);
</script>

<template>
  <div class="app-container">
    <AppImage/>
    <AppInventory/>
    <Transition name="fade">
      <AppMessage v-if="messageShow" @close="messageShow = false"/>
    </Transition>
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
    background: $main-bg;
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr auto;
    gap: 24px;
}
</style>