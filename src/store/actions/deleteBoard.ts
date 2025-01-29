import axios from 'axios';
import Board from '@/typings/board';
import { useStore } from '../store';

export const deleteBoard = async function (this: any, board_id: Board['id']) {

  const state = useStore();

  axios
    .delete(`http://localhost:3000/api/boards/${board_id}`)
    .then(() => {
      this.showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board could not be deleted', true);
    });
    
  state.getBoardList();

};
