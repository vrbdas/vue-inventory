<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import IconBeige from './icons/IconBeige.vue';
import IconBlue from './icons/IconBlue.vue';

const items = ref([
  {
    id: 0,
    icon: 'beige',
    quantity: 3,
  },
  {
    id: 3,
    icon: 'beige',
    quantity: 2,
  },
  {
    id: 21,
    icon: 'blue',
    quantity: 5,
  },
]);

const cells = computed(() => {
  const maxIndex = Math.max(...items.value.map((item) => item.id)); // самый большой индекс у items
  const columns = 5;
  let cellsAmount = 25; // сетка 5 на 5 ячеек
  if (maxIndex + 1 > 25) {
    // если больше 25 предметов, добавляет к ряду недостающее число пустых ячеек
    const rows = Math.ceil((maxIndex + 1) / columns);
    cellsAmount = rows * columns;
  }

  const array = Array(cellsAmount)
    .fill(null)
    .map((value, index) => ({
      id: index,
      blank: true,
    })); // пустой массив с заглушками
  items.value.forEach((item) => {
    // записывает items в массив по id
    array[item.id] = item;
  });
  return array;
});

function iconSelector(iconName) {
  if (iconName == 'beige') return IconBeige;
  if (iconName == 'blue') return IconBlue;
}

// перетаскивание
let draggedIdx = null; // переменная для перетаскиваемой ячейки

// запоминает, какую ячейку перетаскиваем
function onDragStart(event, index) {
  draggedIdx = index;
}

function onDrop(event, targetIndex) {
  if (draggedIdx == null) return;

  const itemsDraggedIdx = items.value.findIndex((item) => item.id == draggedIdx); // находит индекс перетаскиваемого элемента в items

  const itemsTargetIdx = items.value.findIndex((item) => item.id == targetIndex); // находит индекс целевой ячеки в items

  if (itemsTargetIdx > -1) {
    // если индекс уже есть (ячейка занята)
    items.value[itemsDraggedIdx].id = targetIndex;
    items.value[itemsTargetIdx].id = draggedIdx; // меняет местами
  } else {
    items.value[itemsDraggedIdx].id = targetIndex; // меняет id на то куда перетащили
  }

  draggedIdx = null; // cбрасывает значение переменной
}
</script>

<template>
  <div class="inventory">
    <div
      v-for="cell in cells"
      class="cell"
      :key="cell.id"
      @dragover.prevent
      @drop="onDrop($event, cell.id)"
    >
      <div v-if="cell.blank"></div>
      <div v-else>
        <div class="cell-quantity">
          {{ cell.quantity }}
        </div>
        <div class="icon" draggable="true" @dragstart="onDragStart($event, cell.id)">
          <Component :is="iconSelector(cell.icon)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inventory {
  height: 500px;
  background: #4d4d4d;
  border-radius: 12px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(99px, 1fr));
  gap: 0.8px; // исправление для дробного рендеринга
  border: 1px solid #4d4d4d;
}
.cell {
  background: #262626;
  height: 99px;
  position: relative;
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
    border-top: 1px solid #4d4d4d;
    border-left: 1px solid #4d4d4d;
    border-radius: 6px 0px 0px 0px;
  }
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
