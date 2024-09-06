import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Files from '../Files.vue';
import type { ReadFile } from '../Files.vue';
import { createTestingPinia } from '@pinia/testing';
// import any store you want to interact with in tests
import { useDriveStore } from '@/stores/drive';
import { fn, spyOn } from '@vitest/spy';

let wrapper: any = null;
beforeEach(() => {
  // @ts-ignore
  globalThis.gapi = {
    load: fn()
  };
  // @ts-ignore
  globalThis.google = {
    load: fn(),
    accounts: {
      oauth2: {
        initTokenClient: fn()
      }
    }
  };
  wrapper = mount(Files, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: fn,
          initialState: {
            drive: {
              files: [
                {
                  name: 'test file 1',
                  id: 'a',
                  fullFileExtension: 'jpg',
                  modifiedTime: 'today'
                },
                {
                  name: 'test file 2',
                  id: 'b',
                  fullFileExtension: 'png',
                  modifiedTime: 'today'
                }
              ]
            }
          }
        })
      ]
    }
  });
});
describe('Files Component', () => {
  it('fetches and lists files on render', () => {
    const store = useDriveStore(); // uses the testing pinia!

    const filesList = '[data-testid=files-list]';
    expect(store.fetchFiles).toHaveBeenCalledTimes(1);
    expect(wrapper.find(filesList).text()).toContain('test file 1');
    expect(wrapper.find(filesList).text()).toContain('test file 2');
    expect(wrapper.find(filesList).text()).toContain('jpg');
    expect(wrapper.find(filesList).text()).toContain('png');
    expect(wrapper.find(filesList).text()).toContain('today');
    expect(wrapper.findAll('[data-testid=files-item]')).toHaveLength(2);
  });
  it('downloads file on click', () => {
    const store = useDriveStore(); // uses the testing pinia!
    const downloadSpy = spyOn(store, 'downloadFile');
    wrapper.find('[data-testid="files-link-a"]').trigger('click');
    expect(downloadSpy).toHaveBeenCalledOnce();
  });
  it('deletes file on clicking delete', () => {
    const store = useDriveStore(); // uses the testing pinia!
    const deleteSpy = spyOn(store, 'deleteFile');
    wrapper.find('[data-testid="files-delete-a"]').trigger('click');
    expect(deleteSpy).toHaveBeenCalledOnce();
  });
});
