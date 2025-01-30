<template>
  <div class="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Bem vindo!
      </h1>
      <label for="email">Email</label>
      <input
        v-model="loginForm.email"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Email"
        data-cy="login-email"
        name="email"
      >
      <label for="password">Senha</label>
      <input
        v-model="loginForm.password"
        type="password"
        data-cy="login-password"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Senha"
        name="password"
        @keyup.enter="
          login(loginForm.email, loginForm.password).then(() => {
            router.push('/');
          })
        "
      >
      <button
        data-cy="login-submit"
        class="py-2 w-full text-white bg-green7 hover:bg-green6"
        @click="
          login(loginForm.email, loginForm.password).then(() => {
            router.push('/');
          })
        "
      >
        Log in
      </button>
      <router-link
        class="mt-4 text-sm text-center underline"
        to="/signup"
      >
        Não possui conta? Criar conta.
      </router-link>
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/login.png"
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';

const router = useRouter();
const { login } = useStore();
const { loginForm } = storeToRefs(useStore());
</script>
