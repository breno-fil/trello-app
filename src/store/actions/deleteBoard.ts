import axios from 'axios';
import Board from '@/typings/board';

export const deleteBoard = async function (this: any, board_id: Board['id']) {

  axios
    .delete(`http://localhost:3000/api/boards/${board_id}`)
    .then(() => {
      this.showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board could not be deleted', true);
    });
};
