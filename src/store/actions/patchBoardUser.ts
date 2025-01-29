import axios from 'axios';
import Board from '@/typings/board';
import { useStore } from '../store';

export const patchBoardUser = async function (this: any, board: Board, payload: any) {

  const state = useStore();

  var board_id = Number(board.id);
  var user_id = Number(state.activeUser.id);

  const board_user: any = await axios.get(`http://localhost:3000/api/board-users?board_id=${board_id}&user_id=${user_id}`);

  payload = {
    'board_id': board?.id ?? board_user.data[0].board_id,
    'user_id': board?.user ?? board_user.data[0].user_id,
    'role': payload?.role ?? board_user.data[0].role,
    'starred': payload?.starred ?? board_user.data[0].starred
  }

  const patchedBoard = await axios.put(`http://localhost:3000/api/board-users/`, payload);

  const boardIndex = state.boardList.all.findIndex((item: Board) => item.id === board.id);

  const auxBoard: any = state.boardList.all[boardIndex];
  auxBoard.starred = patchedBoard.data.starred;

  var boards: any[] = state.boardList.all;
  boards[boardIndex] = auxBoard;
  
  state.board = auxBoard;
  
  state.getBoardList();
};
