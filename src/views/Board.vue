<template>
  <div class="bg-blue6">
    <CardDetail v-if="cardModule" />
    <BoardDetail />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import CardDetail from '@/components/card/CardDetail.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';

const { cardModule } = storeToRefs(useStore());
</script>
