import Card from '@/typings/card';
import List from '@/typings/list';
import axios from 'axios';

export const deleteCard = async function (this: any, card: Card) {
  
  const { id, list_id } = card;

  console.debug(`deleteCard :: should delete card with id ${id}`);

  const listIndex = this.lists.findIndex((list: List) => list.id === list_id);
  
  await axios.delete(`http://localhost:3000/api/cards/${id}`).then(({data}) => {

    this.lists[listIndex].cards = this.lists[listIndex].cards.filter((item: Card) => item.id !== data.id);
  
    this.activeCard = {};
    this.cardModule = false;
  
    this.showNotification('Card excluído com sucesso.', false);
  }).catch((error) => {
    console.error(`deleteCard :: error :: ${error}`);
    this.showNotification('Não foi possível excluir o card.', true);
  });
  
};
