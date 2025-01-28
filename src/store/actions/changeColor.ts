import Board from '@/typings/board';
import axios from 'axios';

export const changeColor = async function (this: any, boardId: Board['id']) {
  axios
    .put(`http://localhost:3000/api/boards/${boardId}`)
    .then(() => {
      this.showNotification('Board color was changed', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board color could not be deleted', true);
    });
};
