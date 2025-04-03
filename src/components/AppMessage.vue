<script setup></script>

<template>
  <div class="message">
    <div class="message__text">

    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  // width: 785px;
  background: $second-bg;
  border: 1px solid $border;
  border-radius: 12px;
  grid-column: span 2;
  padding: 18px 68px 18px 18px;
  &__text {
    height: 36px;
    border-radius: 12px;
    background: $skeleton;
  }
}
</style>
