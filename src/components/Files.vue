<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDriveStore } from '../stores/drive';

const store = useDriveStore();
store.fetchFiles();

const { files } = storeToRefs(store);
export type ReadFile = {
  id: string;
  name: string;
};
</script>

<template>
  <div class="files">
    <ul data-testid="files-list">
      <li data-testid="files-item" v-for="file in files">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
