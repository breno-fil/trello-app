import Board from '@/typings/board';
import axios from 'axios';

export const createList = async function (this: any, board_id: Board['id'], name: string) {
  axios
    .post('http://localhost:3000/api/lists', { board_id, name, position: this.lists.length })
    .then(({ data }) => {
      data.cards = [];
      this.lists.push(data);
    })
    .catch(() => {
      this.showNotification('List was not created', true);
    });
};
