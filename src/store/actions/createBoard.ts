import axios from 'axios';
import Board from '@/typings/board';
import { useStore } from '../store';

export const createBoard = async function (this: any, name: Board['name']) {
  if (!name) {
    return;
  }

  const state = useStore()
  const starred = false;
  const created_by = state.activeUser.id

  const data = await axios
    .post('http://localhost:3000/api/boards', { name,  created_by, starred})
    .then(({ data }) => {
      this.redirectBoardId = data.id;
      return data;
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('There was an error creating board', true);
    });

  state.getBoardList();

  return data;
};
