import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const patchCard = async function (this: any, card: Card, changes: Partial<Card>) {
  const { id } = card;

  console.debug(`patchCard :: card :: values  :: ${JSON.stringify(card)}`);
  console.debug(`patchCard :: card :: changes :: ${JSON.stringify(changes)}`);

  await axios.patch(`http://localhost:3000/api/cards/${id}`, changes).then((res) => {

    let listIndex = this.lists.findIndex((list: List) => list.id === card.list_id);

    const cardsInList = this.lists[listIndex].cards;

    const patchedCardIndex: number = cardsInList.findIndex((c: Card) => c.id === id);

    this.lists[listIndex].cards[patchedCardIndex] = res.data;

    console.debug(`RES DATA :: ${JSON.stringify(res.data)}`);

    this.activeCard = res.data;
  });

  if (changes.hasOwnProperty('name')) {
    this.showNotification('Card was renamed.', false);
  }
  if (changes.hasOwnProperty('description')) {
    this.showNotification('Description was changed.', false);
  }
  if (changes.hasOwnProperty('due_date')) {
    this.showNotification('Data limite alterada.', false);
  }
};
