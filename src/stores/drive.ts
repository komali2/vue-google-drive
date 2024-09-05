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

  async function downloadFile(id: string, filename: string) {
    // @ts-ignore
    const response = await gapi.client.drive.files.export({
      fileId: id,
      mimeType: 'application/pdf'
    });
    // https://stackoverflow.com/a/64743564/2590119
    // credit to Tanaike
    // Convert binary data to blob.
    const data = response.body;
    const len = data.length;
    const ar = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      ar[i] = data.charCodeAt(i);
    }
    const blob = new Blob([ar], { type: 'application/pdf' });

    // Save the file.
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
  }

  return { fetchFiles, files, downloadFile };
});
