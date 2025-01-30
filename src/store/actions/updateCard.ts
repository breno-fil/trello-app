import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const updateCard = async function (this: any, card: Card, changes: Partial<Card>) {
  const { id, name, description, list_id, position, due_date, created_at } = card;

  console.debug(`updateCard :: [${id}] :: ${name} :: position ${position} :: ${JSON.stringify(changes)}`);
  
  var update_card = {
    id: id,
    name: name,
    description: description,
    list_id: list_id,
    position: position,
    due_date: due_date,
    created_at: created_at
  }

  Object.assign(update_card, changes);

  console.log(`updateCard :: card :: ${JSON.stringify(update_card)}`);

  await axios.put(`http://localhost:3000/api/cards/${id}`, update_card).then(({ data }) => {
    
    console.debug(`updateCard :: data :: ${JSON.stringify(data)}`)

    const patchedListIndex: number = this.lists.findIndex((list: List) => list.id === data.list_id);
    
    console.debug(`patchedListIndex :: ${patchedListIndex}`);

    data.cards = this.lists[patchedListIndex].cards ?? [];
    
    this.lists[patchedListIndex] = data;
  });
  changes.hasOwnProperty('name') && this.showNotification('Card atualizado.', false);
};
