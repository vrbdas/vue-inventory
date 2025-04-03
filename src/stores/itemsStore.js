import { ref, computed, watch, onBeforeMount } from 'vue';
import { defineStore } from 'pinia';

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref([
    {
      id: 0,
      name: 'Beige Item',
      icon: 'beige',
      quantity: 4,
    },
    {
      id: 1,
      name: 'Beige Item',
      icon: 'beige',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Blue Item',
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

  function removeItem(idToRemove) {
    const index = items.value.findIndex((item) => item.id == idToRemove);
    if (index != -1) {
      items.value.splice(index, 1);
    }
  }

  function moveItems(draggedId, targetId) {
    const draggedItem = items.value.find((item) => item.id == draggedId); // перетаскиваемый элемент в items
    const targetItem = items.value.find((item) => item.id == targetId); // находит целевой элемент в items

    if(!draggedItem) return; // c пустыми ячейками ничего не делать

    if (!targetItem) { // если ячейка свободна перетаскивает на неё
      draggedItem.id = targetId;
      return;
    }

    if (draggedItem.id == targetItem.id) return; // перетащили на ту же ячейку - ничего не делать

    if (draggedItem.name == targetItem.name) { // одинаковые предметы складывает
      const summ = draggedItem.quantity + targetItem.quantity;
      targetItem.quantity = summ;
      removeItem(draggedId);
      return;
    }

    // разные предметы меняет местами
    draggedItem.id = targetId;
    targetItem.id = draggedId;
  }

  watch(() => items.value, (newValue) => { // сохраняет предметы в localStorage
    if(newValue) {
      localStorage.setItem('items', JSON.stringify(newValue));
    }
  }, { deep: true });

  onBeforeMount(() => { // загружает при обновлении страницы
    if(localStorage.getItem('items')) {
      items.value = JSON.parse(localStorage.getItem('items'));
    }
  });

  return { items, cells, removeItem, moveItems };
});
