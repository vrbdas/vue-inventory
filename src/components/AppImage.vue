<script setup></script>

<template>
  <div class="image">
    <img src="@/assets/image.png" alt="image" />
    <ul class="replacer">
      <li v-for="item in 7" :key="item"></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.image {
  height: 500px;
  background: $second-bg;
  border: 1px solid $border;
  border-radius: 12px;
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  img {
    width: 100%;
    max-height: 240px;
    object-fit: contain;
  }
}

.replacer {
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    list-style: none;
    height: 10px;
    border-radius: 4px;
    background: $skeleton;
    margin-bottom: 16px;
    &:nth-of-type(1) {
      border-radius: 8px;
      width: 190px;
      height: 26px;
      margin-bottom: 24px;
    }
    &:nth-of-type(2) {
      width: 155px;
    }
    &:nth-of-type(3) {
      width: 190px;
    }
    &:nth-of-type(4) {
      width: 170px;
    }
    &:nth-of-type(5) {
      width: 160px;
    }
    &:nth-of-type(6) {
      width: 140px;
      margin-bottom: 24px;
    }
    &:nth-of-type(7) {
      width: 80px;
      margin-bottom: 0;
    }
  }
}
</style>
