import Board from '@/typings/board';
import axios from 'axios';

export const createList = async function (this: any, board_id: Board['id'], name: string) {

  console.log(`BOARD ID :: ${board_id}`)
  
  axios
    .post('http://localhost:3000/api/lists', { name, board_id, position: this.lists.length })
    .then(({ data }) => {
      data.cards = [];
      this.lists.push(data);
    })
    .catch(() => {
      this.showNotification('List was not created', true);
    });
};
