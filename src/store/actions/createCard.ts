import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const createCard = async function (this: any, card: Partial<Card>) {
  const listIndex = this.lists.findIndex((list: List) => list.id === card.list_id);
  const cardsInList = this.lists[listIndex].cards;
  const order = cardsInList.length;

  const newCard: Partial<Card> = {
    name: card.name,
    position: order,
    list_id: card.list_id,
    due_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  }

  axios
    .post('http://localhost:3000/api/cards', newCard)
    .then(({ data }) => {
      console.debug(`createCard :: card created :: ${JSON.stringify(data)}`);
      this.lists[listIndex].cards.push(data);
    })
    .catch((e) => {
      this.showNotification('Card was not created', true);
    });
};
