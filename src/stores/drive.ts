/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDriveStore = defineStore('drive', () => {
  const files = ref([]);

  async function fetchFiles() {
    // @ts-ignore
    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: 'files(id, name)'
    });
    files.value = response.result.files;
  }

  return { fetchFiles, files };
});
