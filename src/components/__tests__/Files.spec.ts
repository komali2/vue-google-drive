import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Files from '../Files.vue';
import type { ReadFile } from '../Files.vue';
import { createTestingPinia } from '@pinia/testing';
// import any store you want to interact with in tests
import { useDriveStore } from '@/stores/drive';
import { fn } from '@vitest/spy';

describe('Files Component', () => {

  it('renders properly', () => {
    const wrapper = mount(Files, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: fn,
            initialState: {
              drive: {
                files: [
                  {
                    name: 'test file 1',
                    id: '1'
                  },
                  {
                    name: 'test file 2',
                    id: '2'
                  }
                ]
              }
            }
          })
        ],
        mocks: {
          gapi: {
            load: function() {},
            client: {
              init: function() {},
            }
          }
        }
      }
    });
    const store = useDriveStore(); // uses the testing pinia!
    const filesList = '[data-testid=files-list]';
    expect(store.fetchFiles).toHaveBeenCalledTimes(1);
    expect(wrapper.find(filesList).text()).toContain('test file 1');
    expect(wrapper.findAll('[data-testid=files-item]')).toHaveLength(2);
  });
});
