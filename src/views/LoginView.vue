<template>
  <div class="login">
    <h1>Login</h1>
    <!--Add buttons to initiate auth sequence and sign out-->
    <button id="authorize_button" @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { ROUTES } from '../router/index';

const store = useAuthStore();
const router = useRouter();

function login() {
  store.login();
}
const { isLoggedIn } = storeToRefs(store);

watch(isLoggedIn, () => {
  if (isLoggedIn) {
    router.push({ name: ROUTES.home });
  }
});

onMounted(() => {});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
