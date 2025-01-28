import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const deleteCard = async function (this: any, card: Card) {
  const { id, list_id } = card;
  await axios.delete(`http://localhost:3000/api/cards/${id}`);
  const listIndex = this.lists.findIndex((list: List) => list.id === list_id);
  this.lists[listIndex].cards = this.lists[listIndex].cards.filter((item: Card) => item.id !== id);
  this.activeCard = {};
  this.cardModule = false;
  this.showNotification('Card was deleted', false);
};
