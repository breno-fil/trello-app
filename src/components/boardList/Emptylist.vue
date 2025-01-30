<template>
  
  <div v-if="checkUser()" class="grid z-10 grid-cols-2 gap-x-8 items-stretch px-20 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Vamos lá!
      </h1>
      <p>Crie o seu primeiro board!</p>
      <input
        v-model="newBoardTitle"
        type="text"
        data-cy="first-board"
        class="px-2 mt-4 w-full h-8 bg-white rounded-sm border-2"
        placeholder="Nome do seu board"
        name="newBoard"
        @keyup.enter.prevent="redirectToNewBoard()"
      >
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/start.png"
    >
  </div>

  <div v-if="!checkUser()" class="grid z-10 grid-cols-2 gap-x-8 items-stretch px-20 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Usuário não logado.
      </h1>
      <button
        data-cy="login-submit"
        class="py-2 w-full text-white bg-green7 hover:bg-green6"
        @click="router.push('/login');"
      >
      Entrar
    </button>
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/start.png"
    >
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
const router = useRouter();
const newBoardTitle = ref('');
const { createBoard, activeUser } = useStore();

const redirectToNewBoard = async () => {
  const { id } = await createBoard(newBoardTitle.value);
  router.push(`/board/${id}`);
};

const checkUser = () => {
  return activeUser.loggedIn;
}
</script>
