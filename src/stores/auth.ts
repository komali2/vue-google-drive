/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref({});
  const isLoggedIn = ref(false);

  const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_OAUTH_API_KEY;

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/drive';

  let tokenClient: any;
  let gapiInited = false;
  let gisInited = false;

  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC]
    });
    gapiInited = true;
    const tokenCheck = localStorage.getItem('token');
    if (tokenCheck) {
      const parsed = JSON.parse(tokenCheck);
      token.value = parsed;
      gapi.client.setToken(parsed);
      isLoggedIn.value = true;
    }
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    // types should be working from the gapi.auth2 package but they aren't
    // So, ignore! :)
    // @ts-ignore
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '' // defined later
    });

    gisInited = true;
  }

  function logout() {
    const token = gapi.client.getToken();
    if (token !== null) {
      // @ts-ignore
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('' as unknown as GoogleApiOAuth2TokenObject);
      localStorage.setItem('token', '');
    }
  }

  async function login() {
    tokenClient.callback = async (resp: any) => {
      token.value = resp;
      localStorage.setItem('token', JSON.stringify(resp));

      isLoggedIn.value = true;
      if (resp.error !== undefined) {
        throw resp;
      }
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }
  gapiLoaded();
  gisLoaded();
  return { login, logout, isLoggedIn };
});
