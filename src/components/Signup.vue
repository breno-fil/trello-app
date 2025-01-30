<template>
  <div class="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Create a new account
      </h1>
      <label for="username">Username</label>
      <input
        v-model="signupForm.username"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Username"
        name="username"
        data-cy="signup-username"
      >
      <label for="email">Email</label>
      <input
        v-model="signupForm.email"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Email"
        name="email"
        data-cy="signup-email"
      >
      <label for="password">Password</label>
      <input
        v-model="signupForm.password"
        type="password"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        data-cy="signup-password"
        placeholder="Password"
        name="password"
        @keyup.enter="
          signup(signupForm.username, signupForm.email, signupForm.password).then(() => {
            router.push('/');
          })
        "
      >
      <button
        class="py-2 w-full text-white bg-green7 hover:bg-green6"
        data-cy="signup-submit"
        @click="
          signup(signupForm.username, signupForm.email, signupForm.password).then(() => {
            router.push('/');
          })
        "
      >
        Criar conta
      </button>
      <router-link
        class="mt-4 text-sm text-center underline"
        to="/login"
      >
        Já possui conta? Log in.
      </router-link>
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/signup.png"
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';

const router = useRouter();

const { signup } = useStore();

const { signupForm } = storeToRefs(useStore());
</script>
