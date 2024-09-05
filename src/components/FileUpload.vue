<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useDriveStore } from '../stores/drive';

const driveStore = useDriveStore();

const toUpload = ref([]);

const { uploadingFile } = storeToRefs(driveStore);

function setFile(event: Event) {
  if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
    toUpload.value = event.target.files;
  }
}
function upload() {
  if (toUpload.value.length) {
    driveStore.uploadFile(toUpload.value);
  }
}
</script>

<template>
  <div>
    <div v-if="uploadingFile">Uploading...</div>
    <input type="file" id="files" name="file" @change="setFile" />
    <button @click="upload">Upload</button>
  </div>
</template>
