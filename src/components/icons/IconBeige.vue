<script setup></script>

<template>
  <div class="icon-beige">
    <div class="square square-lower"></div>
    <div class="square square-higher"></div>
  </div>
</template>

<style scoped lang="scss">
.icon-beige {
  position: relative;
  width: 48px;
  height: 48px;
}

.square {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
  &-lower {
    background: rgb(127, 170, 101);
    transform: translate(-3px, 3px);
  }
  &-higher {
    backdrop-filter: blur(12px);
    background: rgba(184, 217, 152, 0.35);
    transform: translate(3px, -3px);
  }
}
</style>