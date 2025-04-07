<script setup>

</script>

<template>
  <div class="message">
    <div class="message-text"></div>
    <div class="close" @click="$emit('close')"></div>
  </div>
</template>

<style scoped lang="scss">
.message {
  background: $second-bg;
  border: 1px solid $border;
  border-radius: 12px;
  grid-column: span 2;
  padding: 18px 68px 18px 18px;
  position: relative;
  &-text {
    height: 36px;
    border-radius: 12px;
    background: $skeleton;
  }
}

.close {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 24px;
    height: 24px;
    @include cursor-hover;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 11px;
      left: 6px;
      width: 16px;
      border-bottom: 2px solid #fff;
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
</style>
