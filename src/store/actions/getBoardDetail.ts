import { useRoute } from 'vue-router';

import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';
import axios, { AxiosError } from 'axios';
import { useStore } from '../store';

export const getBoardDetail = async function (this: any, id: Board['id']) {

  const state = useStore()
  const route = useRoute();

  state.board.id = id;

  this.loading = true;

  try {

    const board_user: any = await axios.get(`http://localhost:3000/api/board-users?board_id=${id}&user_id=${state.activeUser.id}`);

    state.board = {...state.board, 'starred': board_user.data.starred};

    console.debug(`getBoardDetail :: board :: ${JSON.stringify(state.board)}`);

    const board = await axios.get(`http://localhost:3000/api/boards/${id}`);
    this.board = board.data;

    const lists = await axios.get(`http://localhost:3000/api/lists?board_id=${id}`);
    lists.data.sort((a: List, b: List) => {
      return a.position - b.position;
    });
    this.lists = lists.data;
    if (lists.data.length) this.createListInput = false;

    // if there are no lists, don’t fetch cards
    this.lists.forEach((list: List, index: number) => {
      this.loadingListCards[this.lists[index].id] = true;
      axios.get(`http://localhost:3000/api/cards?list_id=${list.id}`).then(({ data }) => {
        
        console.debug(`getBoardDetail :: cards list ${index} :: ${JSON.stringify(data)}`);

        data.sort((a: Card, b: Card) => { return a.order - b.order });

        this.lists[index].cards = [];

        this.lists[index].cards.push(...data);

        this.loadingListCards[this.lists[index].id] = false;
      });
    });

    const qs: any = route.query?.card;
    if (qs !== undefined) {
      this.showCardModule(qs, true);
    }
    this.loading = false;
  }
 catch (err) {
    const { response } = err as AxiosError<any>;
    this.loading = false;
    this.loadingError.show = true;
    this.loadingError.message = response?.data?.message;
    this.loadingError.status = response?.status;
  }
};
