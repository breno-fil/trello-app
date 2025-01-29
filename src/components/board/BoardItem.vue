<template>
  <router-link
    v-slot="{ navigate }"
    custom
    :to="{ path: '/board/' + board.id }"
  >
    <div
      class="board"
      :id="'board-' + board.id"
      data-cy="board-item"
      @click="navigate"
      @mouseover="showStar = true"
      @mouseout="showStar = false"
    >
      <h2>
        {{ board.name }}
      </h2>
      <div
        v-show="showStar"
        data-cy="star"
        class="star"
        @click.stop="starBoard(board)"
      >
        <Star
          class="col-span-1 w-5 h-5"
          :class="[board.starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Board from '@/typings/board';
import Star from '@/assets/icons/star.svg';
import { patchBoardUser } from '@/store/actions/patchBoardUser';

// const { patchBoard } = useStore();
defineProps({
  board: {
    default: null,
    type: Object as PropType<Board>,
  },
});

// var state = useStore();

let showStar = ref(false);

const starBoard = (board: any) => {

  if (board && board.hasOwnProperty('starred')) {
    patchBoardUser(board, {'board_id': Number(board.id), 'starred': !board.starred});
  } else {
    console.error("Problema no Board")
    console.debug(`boardItem :: board :: ${board}`);
  }

}


function userStore() {
  throw new Error('Function not implemented.');
}
</script>

<style lang="postcss" scoped>
.board {
  @apply bg-blue7 w-72 h-36 px-4 py-3 cursor-pointer grid grid-cols-6 justify-between rounded-sm hover:bg-blue8;
}
.star {
  @apply justify-self-end self-start;
}
h2 {
  @apply text-white font-bold col-span-5;
}
</style>
