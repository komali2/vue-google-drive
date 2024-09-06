<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useDriveStore } from '../stores/drive';

const driveStore = useDriveStore();

const toUpload = ref([]);

const { uploadingFile } = storeToRefs(driveStore);

function setFile(event: Event) {
  // @ts-ignore
  if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files.length) {
    // @ts-ignore
    toUpload.value = event.target?.files || [];
  }
}
function upload() {
  if (toUpload.value.length) {
    driveStore.uploadFile(toUpload.value);
  }
}
</script>

<template>
  <div class="uploader">
    <h2>Upload File</h2>
    <div v-if="uploadingFile">Uploading...</div>
    <input type="file" id="files" name="file" @change="setFile" />
    <button @click="upload" :disabled="!toUpload.length">Upload</button>
  </div>
</template>

<style scoped>
.uploader {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  margin-bottom: 24px;
  align-items: baseline;
}
</style>
