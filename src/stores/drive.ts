/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from '../stores/auth';
import type { ReadFile } from '../components/Files.vue';

export const useDriveStore = defineStore('drive', () => {
  const authStore = useAuthStore();
  const files = ref([]);
  const uploadingFile = ref(false);

  async function fetchFiles() {
    // @ts-ignore
    const response = await gapi.client.drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, modifiedTime, fullFileExtension, trashed)'
    });
    files.value = response.result.files.filter((file: ReadFile) => {
      return !file.trashed;
    });
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

  async function uploadFile(files: File[]) {
    // Tanaike again, stackoverflow's resident
    // only-person-who-actually-understood-the-gdrive-api-docs
    // https://stackoverflow.com/a/65192321/2590119
    const file = files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    uploadingFile.value = true;
    fr.onload = (f) => {
      const fileMetadata = {
        name: file.name,
        parents: []
      };
      const form = new FormData();
      form.append(
        'metadata',
        new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' })
      );
      // @ts-ignore
      form.append('file', new Blob([new Uint8Array(f.target.result)], { type: file.type }));
      fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        // @ts-ignore
        headers: new Headers({ Authorization: 'Bearer ' + authStore.token.access_token }),
        body: form
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          uploadingFile.value = false;
        });
    };
  }

  // The docs straight up are incorrect on this, indicating you should use
  // `requestBody` instead of `resource`.
  // https://developers.google.com/drive/api/guides/delete
  // The only way to find out otherwise is
  // to stumble across the absolute unit of a drive api knower, Tanaike, and their
  // distinctive stack overflow answering style
  //  https://stackoverflow.com/a/62366489/2590119
  async function deleteFile(id: string) {
    // @ts-ignore
    const response = await gapi.client.drive.files.update({
      fileId: id,
      resource: {
        trashed: true
      }
    });
    return response;
  }

  return { fetchFiles, files, downloadFile, uploadFile, uploadingFile, deleteFile };
});
