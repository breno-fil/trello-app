interface Board {
  id: number;
  name: string;
  user: number;
  starred: boolean;
  text_color: string;
  created_by: number;
  background_color: string;
}

export default Board;
