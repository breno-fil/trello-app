<template>
  <div class="inline-block relative">
    <button
      data-cy="board-options"
      class="inline-grid self-center ml-2 w-8 h-8 text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-sm cursor-pointer"
      @click="showDropdown()"
    >
      <Dots class="place-self-center m-2" />
    </button>
    <Dropdown
      v-if="dropdown"
      v-click-away="onClickAway"
      data-cy="board-dropdown"
      :header="'Board actions'"
      @close="hideDropdown()"
    >
      <DropdownItem
        item-text="Change Background Color"
        data-cy="change-color"
        @click="
          changeColor(board.id);
        "
      />
      <DropdownItem
        item-text="Delete board"
        :warning="true"
        data-cy="delete-board"
        @click="
          deleteBoard(board.id);
          router.push('/');
          showDropdown();
        "
      />
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Board from '@/typings/board';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown.vue';
import DropdownItem from '@/components/common/DropdownItem.vue';

defineProps({
  board: {
    default: null,
    type: Object as PropType<Board>,
  },
});

const router = useRouter();
const dropdown = ref(false);
const { changeColor } = useStore();
const { deleteBoard } = useStore();
const onClickAway = () => {
  dropdown.value = false;
};
const showDropdown = () => {
  dropdown.value = true;
};
const hideDropdown = () => {
  dropdown.value = false;
};
</script>
