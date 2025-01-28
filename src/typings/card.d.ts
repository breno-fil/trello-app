interface Card {
  id: number;
  name: string;
  order: number;
  list_id: number;
  board_id: number;
  due_date: string;
  position: number;
  completed: boolean;
  created_at: string;
  description: string;
  image: string | null;
}

export default Card;
