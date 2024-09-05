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

function download(id: string, filename: string) {
  store.downloadFile(id, filename);
}
</script>

<template>
  <div class="files">
    <ul data-testid="files-list">
      <li data-testid="files-item" v-for="file in files">
        <a @click="() => download(file.id, file.name)">{{ file.name }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  cursor: pointer;
}
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
