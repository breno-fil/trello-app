<template>
  <div
    class="grid"
    :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'"
  >
    <!-- LOADING -->
    <div
      v-if="state.loading"
      class="grid justify-center content-center h-screen loading"
    >
      <div><LoadingIcon class="inline-block mb-1" />&nbsp;&nbsp;Carregando dados...</div>
    </div>
    <!-- ERROR STATE -->
    <div
      v-if="state.loadingError.show"
      class="grid justify-center content-center h-screen"
      data-cy="board-list-error-message"
    >
      <span class="block mb-4 text-8xl font-bold text-center text-gray-200">{{ state.loadingError.status }}</span>
      <p class="block mb-4 text-center text-gray-400">
        {{ state.loadingError.message || 'There was an error loading board' }}
      </p>
      <router-link
        to="/"
        class="block font-semibold text-center text-blue7"
      >
        Voltar
      </router-link>
    </div>
    <!-- BOARD DETAIL -->
    <div
      v-if="!state.loading && !state.loadingError.show"
      class="overflow-x-auto whitespace-nowrap board-detail"
      data-cy="board-detail"
    >
      <div class="py-2.5">
        <div class="inline-block relative py-1.5 mr-0 ml-3 h-8">
          <div class="inline-block invisible px-3 font-bold">
            {{ state.board.name }}
          </div>
          <input
            v-model="state.board.name"
            v-click-away="onClickAway"
            class="text-white bg-white bg-opacity-20 hover:bg-opacity-30 board-title"
            data-cy="board-title"
            autocomplete="off"
            name="board-title"
            @focus="selectInput($event)"
            @change="renameBoard(state.board.name)"
            @keyup.enter="blurInput($event)"
            @keyup.esc="blurInput($event)"
          >
        </div>
        <div
          class="inline-grid relative self-center ml-2 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
          :class="[checkStar() ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
          data-cy="star"
          @click="starBoard()"
        >
          <Star class="place-self-center m-2" />
        </div>
        <BoardOptions :board="state.board" />
      </div>
      <draggable
        v-model="state.lists"
        animation="150"
        group="lists"
        item-key="order"
        class="inline-block"
        @end="state.sortLists"
      >
        <template #item="{ element }">
          <div
            class="inline-block align-top"
            data-cy="list-placeholder"
          >
            <ListItem :list="element" />
          </div>
        </template>
      </draggable>
      <div class="inline-block align-top">
        <ListCreate :board="state.board.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blurInput } from '@/utils/blurInput';
import { ref } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/store/store';
import { useRoute } from 'vue-router';
import BoardOptions from '@/components/board/BoardOptions.vue';
import ListCreate from '@/components/list/ListCreate.vue';
import ListItem from '@/components/list/ListItem.vue';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import Star from '@/assets/icons/star.svg';
import draggable from 'vuedraggable';
import { patchBoard } from '@/store/actions/patchBoard';
import { patchBoardUser } from '@/store/actions/patchBoardUser';

const route = useRoute();
const state = useStore();
const inputActive = ref(false);
const board_id = Number(route.params.board);

state.getBoardDetail(board_id);

const starBoard = () => {

  var auxBoard = {...state.board};
  auxBoard.id = board_id;
  auxBoard.user = state.activeUser.id;
  
  const boards = state.boardList.all.filter((item: any) => { return Number(item.id) == board_id });

  if (boards.length == 1) {
    auxBoard = boards[0];
    const starred = !auxBoard.starred;
    patchBoardUser(auxBoard, {'board_id': board_id, 'starred': starred});
  } else {
    console.error("Error on starring board.")
    state.showNotification('Erro ao favoritar board.', true)
  }
  
}

const renameBoard = (name: string) => {
  if (name == null || name == "") {
    state.showNotification('Boards precisam de um nome.', true);
  } else {
    state.board.id = board_id;
    patchBoard(state.board, {'name': name});
  }
}

const checkStar = () => {
  var auxBoard = {...state.board};
  auxBoard.id = board_id;
  auxBoard.user = state.activeUser.id;

  const boards = state.boardList.all.filter((item: any) => {return Number(item.id) == board_id});
  
  if (boards.length == 1) {
    auxBoard = boards[0];
    return auxBoard.starred;
  } else {
    console.error("Error on star check.");
    state.showNotification('Erro ao favoritar board.', true);
    return false;
  }
}

const onClickAway = () => {
  inputActive.value = false;
};
</script>

<style lang="postcss" scoped>
.board-detail {
  height: calc(100vh - 40px);
}

.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}
</style>
