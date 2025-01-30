import List from '@/typings/list';
import axios from 'axios';

export const patchList = async function (this: any, list: List, changes: Partial<List>) {
  const { id } = list;
  console.debug(`patchList :: changes :: [${list.id}] ${list.name} :: position ${list.position} :: ${JSON.stringify(changes)}`);

  await axios.patch(`http://localhost:3000/api/lists/${id}`, changes).then(({ data }) => {
    
    console.debug(`patchList :: data :: ${JSON.stringify(data)}`)

    const patchedListIndex: number = this.lists.findIndex((c: List) => c.id === id);
    
    data.cards = this.lists[patchedListIndex].cards ?? [];
    
    this.lists[patchedListIndex] = data;
  });
  changes.hasOwnProperty('name') && this.showNotification('Lista atualizada.', false);
};
