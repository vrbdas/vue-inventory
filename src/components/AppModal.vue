<script setup>
import { ref } from 'vue';
import ItemIcon from '@/components/ItemIcon.vue';

const emit = defineEmits(['closeModal', 'removeItem']);
const props = defineProps(['item']);


const confirmShow = ref(false);
const quantToRemove = ref(null);

function cancelClick() {
  confirmShow.value = false;
  quantToRemove.value = null;
}

function confirmClick() {
  emit('removeItem', quantToRemove.value);
  emit('closeModal');
}
</script>

<template>
  <div class="modal-bg"></div>
  <div class="modal">
    <div class="modal-close" @click="emit('closeModal')"></div>
    <div class="modal-icon">
      <ItemIcon :color="item.icon" :large="true" />
    </div>
    <hr />
    <ul class="replacer">
      <li v-for="item in 6" :key="item"></li>
    </ul>
    <hr />
    <button @click="confirmShow = true" class="modal-btn">Удалить предмет</button>
    <Transition name="fade">
      <div v-if="confirmShow" class="confirm">
        <input type="number" v-model="quantToRemove" placeholder="Введите количество" />
        <div class="confirm-btns">
          <button @click="cancelClick">Отмена</button>
          <button @click="confirmClick">Подтвердить</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 38, 38, 0.5);
  border: 1px solid $border;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 55px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-close {
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
  &-icon {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-btn {
    width: 100%;
    height: 39px;
    border: none;
    border-radius: 8px;
    background: $btn;
    cursor:
      url('@/assets/hand.png') 0 0,
      auto;
    font-family: 'Roboto';
    font-size: 14px;
    color: #fff;
    @include cursor-hover;
    &:hover {
      background: $btn-hover;
    }
  }
}

.modal-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(16px);
  border: 1px solid $border;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

hr {
  border: none;
  padding: 0;
  height: auto;
  width: auto;
  background: none;
  border-bottom: 1px solid $border;
}

.replacer {
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    list-style: none;
    height: 10px;
    width: 211px;
    border-radius: 4px;
    background: $skeleton;
    margin-bottom: 16px;
    &:nth-of-type(1) {
      border-radius: 8px;
      height: 30px;
      margin-bottom: 24px;
    }
    &:nth-of-type(5) {
      width: 180px;
    }
    &:nth-of-type(6) {
      width: 80px;
      margin-bottom: 0;
    }
  }
}

.confirm {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 133px;
  width: 100%;
  z-index: 2;
  background: $second-bg;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid $border;
  border-bottom-right-radius: 12px;
  input {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
    border: 1px solid $border;
    border-radius: 4px;
    padding: 11px;
    background: none;
    width: 100%;
    color: #fff;
    outline: none;
    appearance: textfield;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  &-btns {
    display: flex;
    justify-content: space-between;
    button {
      font-size: 14px;
      font-weight: 400;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: inherit;
      @include cursor-hover;
      &:first-child {
        background-color: #fff;
      }
      &:last-child {
        color: #fff;
        background-color: $btn;
        &:hover {
          background-color: $btn-hover;
        }
      }
    }
  }
}
</style>
