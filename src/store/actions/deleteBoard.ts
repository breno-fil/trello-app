import axios from 'axios';
import Board from '@/typings/board';
import { getBoardList } from './getBoardList';

export const deleteBoard = async function (this: any, board_id: Board['id']) {

  console.debug(`DELETE BOARD :: ${board_id}`)

  axios
    .delete(`http://localhost:3000/api/boards/${board_id}`)
    .then(() => {
      getBoardList();
      this.showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board could not be deleted', true);
    });

};
