<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDriveStore } from '../stores/drive';

const store = useDriveStore();
store.fetchFiles();

const { files } = storeToRefs(store);
export type ReadFile = {
  id: string;
  name: string;
  modifiedTime: string;
  fullFileExtension: string;
  trashed: boolean;
};

function download(id: string, filename: string) {
  store.downloadFile(id, filename);
}

function deleteFile(id: string) {
  store.deleteFile(id);
}
</script>

<template>
  <div class="files">
    <h2>Files</h2>
    <ul data-testid="files-list">
      <li data-testid="files-item" v-for="file in files" class="files-item">
        <a class="name" @click="() => download(file.id, file.name)">{{ file.name }}</a>
        <span class="filetype">
          {{ file.fullFileExtension || 'gdoc' }}
        </span>
        <span class="modified-time">
          {{ file.modifiedTime }}
        </span>
        <button class="delete" @click="() => deleteFile(file.id)">Delete</button>
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

.files-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
}
.name {
  flex-grow: 0;
  width: 290px;
}

.filtype {
  width: 33px;
}

.modified-time {
  width: 191px;
}

.delete {
  margin-left: 8px;
  background-color: #bf4342;
  color: white;
  cursor: pointer;
}
</style>
