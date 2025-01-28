import Card from './card';

interface List {
  id: number;
  name: string;
  cards: Card[];
  created: string;
  position: number;
  board_id: number;
}

export default List;
