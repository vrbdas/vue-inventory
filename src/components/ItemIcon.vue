<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
    validator: (value) => ['beige', 'blue'].includes(value),
  },
  large: { type: Boolean, default: false, required: false },
});
</script>

<template>
  <div class="icon" :class="large ? 'large' : ''">
    <div class="square-lower" :class="[color, large ? 'large' : '']" ></div>
    <div class="square-higher" :class="[color, large ? 'large' : '']"></div>
  </div>
</template>

<style scoped lang="scss">
.icon {
  position: relative;
  width: 48px;
  height: 48px;
  &.large {
    width: 115px;
    height: 115px;
  }
}

.square-lower, .square-higher {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
  &.large {
    width: 115px;
    height: 115px;
  }
}

.square-lower {
  transform: translate(-3px, 3px);
  &.beige {
    background: rgb(127, 170, 101);
  }
  &.blue {
    background: rgb(101, 108, 170);
  }
  &.large {
    transform: translate(-7px, 7px);
  }
}

.square-higher {
  backdrop-filter: blur(12px);
  transform: translate(3px, -3px);
  &.beige {
    background: rgba(184, 217, 152, 0.35);
  }
  &.blue {
    background: rgba(116, 129, 237, 0.35);
  }
  &.large {
    transform: translate(7px, -7px);
  }
}
</style>
