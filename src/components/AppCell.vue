<script setup>
import ItemIcon from '@/components/ItemIcon.vue';
const props = defineProps(['cell']);
const emit = defineEmits(['dragStart']);
</script>

<template>
  <div class="cell">
    <div v-if="cell.blank"></div>
    <div v-else>
      <div class="cell-quantity">
        {{ cell.quantity }}
      </div>
      <div class="icon" draggable="true" @dragstart="emit('dragStart')">
        <ItemIcon :color="cell.icon"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cell {
  background: $second-bg;
  height: 99px;
  position: relative;
  &:has(.icon):hover {
    transition: 0.3s ease all;
    background: $hover-bg;
  }

  &-quantity {
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 10px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top: 1px solid $border;
    border-left: 1px solid $border;
    border-radius: 6px 0px 0px 0px;
    user-select: none;
  }
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include cursor-hover;
}
</style>
