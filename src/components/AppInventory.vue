<script setup>
import { ref } from 'vue';
import AppCell from '@/components/AppCell.vue';
import AppModal from '@/components/AppModal.vue';
import { useItemsStore } from '@/stores/itemsStore.js';

const itemsStore = useItemsStore();

// перетаскивание
let draggedId = null; // переменная для перетаскиваемой ячейки

// запоминает, какую ячейку перетаскиваем
function onDragStart(index) {
  draggedId = index;
}

function onDrop(targetId) {
  itemsStore.moveItems(draggedId, targetId);
  draggedId = null; // cбрасывает значение переменной
}

// модальное окно
const modalOpen = ref(false);
const selectedItem = ref();

function cellClick(clickedId) {
  if (modalOpen.value) {
    modalOpen.value = false;
    return;
  }; // закрыть если уже было открыто

  selectedItem.value = itemsStore.items.find((item) => item.id == clickedId);
  if (selectedItem.value) {
    modalOpen.value = true;
  } // открывать только на предмете
}

function handleRemoveItem(value) {
  if (Math.floor(value) < 1) return;
  if (Math.floor(value) < selectedItem.value.quantity) {
    selectedItem.value.quantity -= value;
  } else {
    itemsStore.removeItem(selectedItem.value.id);
  }
}
</script>

<template>
  <div class="inventory-wrapper">
    <Transition name="slide-right">
      <div v-if="modalOpen" class="modal-wrapper">
        <AppModal @closeModal="modalOpen = false" @removeItem="handleRemoveItem" :item="selectedItem"/>
      </div>
    </Transition>
    <div class="inventory">
      <AppCell
        v-for="cell in itemsStore.cells"
        :key="cell.id"
        :cell="cell"
        @dragStart="onDragStart(cell.id)"
        @dragover.prevent
        @drop="onDrop(cell.id)"
        @click="cellClick(cell.id)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.inventory-wrapper {
  position: relative;
  overflow: hidden;
}
.modal-wrapper {
  width: 250px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.inventory {
  position: relative;
  height: 500px;
  background: $border;
  border-radius: 12px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(99px, 1fr));
  gap: 0.8px; // исправление для дробного рендеринга
  border: 1px solid $border;
}
</style>
