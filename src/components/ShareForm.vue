<template>
    <div class="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
      <div class="grid content-center">
        <h1 class="mb-8 text-3xl font-bold">
          Compartilhamento
        </h1>
        <label for="board">Selecione um quadro</label>
        <select class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-gray2 rounded-sm"
            v-model="selectedBoard" name="board">
          <option disabled>Quadros disponíveis</option>
          <option v-for="board in availableBoards" :key="board.name" :value="board.id">{{board.name}}</option>
        </select>

        <label for="user">Selecione um usuário</label>
        <select class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-gray2 rounded-sm"
            v-model="selectedBoard" name="user">
            <option disabled>Usuários disponíveis</option>
            <!-- <option v-for="user in availableUsers" :key="user.name" :value="user.email">{{user.username}}</option> -->
        </select>

        <label for="permission">Selecione o tipo de permissão</label>
        <select class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-gray2 rounded-sm"
            v-model="selectedBoard" name="permission">
          <option disabled>Permissões disponíveis</option>
          <option v-for="p in permissions" :key="p.name" :value="p.value">{{p.name}}</option>
        </select>
        
      </div>
      <img
        class="gap-x-5 self-center place-self-center"
        src="@/assets/signup.png"
      >
    </div>
  </template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Board from '@/typings/board';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';

const router = useRouter();
const {board, getBoardList, boardList} = useStore();
const selectedBoard: number = -1;
const { shareForm } = storeToRefs(useStore());

getBoardList();

console.debug(`shareForm :: `)

var availableBoards: Board[] = boardList.all;

var availableUsers = [
    {name: "Quadro 1", value: "1"},
    {name: "Quadro 2", value: "2"},
    {name: "Quadro 3", value: "3"},
    {name: "Quadro 4", value: "4"}
];

var permissions: Array<{'name': string, 'value': string}> = [
    {'name': "Editor", 'value': 'owner'},
    {'name': "Membro", 'value': 'member'}
];

console.debug(`shareForm :: board :: ${JSON.stringify(board)}`);
</script>
  