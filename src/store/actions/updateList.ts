import List from '@/typings/list';
import axios from 'axios';

export const updateList = async function (this: any, list: List, changes: Partial<List>) {
  const { id, name, position, board_id } = list;

  console.debug(`updateList :: [${id}] :: ${name} :: position ${position} :: ${JSON.stringify(changes)}`);
  
  var update_list = {
    id: id,
    name: name,
    board_id: board_id,
    position: position
  }

  Object.assign(update_list, changes);

  console.log(`updateList :: list :: ${JSON.stringify(update_list)}`);

  await axios.put(`http://localhost:3000/api/lists/${id}`, update_list).then(({ data }) => {
    
    console.debug(`updateList :: data :: ${JSON.stringify(data)}`)

    const patchedListIndex: number = this.lists.findIndex((c: List) => c.id === id);
    
    data.cards = this.lists[patchedListIndex].cards ?? [];
    
    this.lists[patchedListIndex] = data;
  });
  changes.hasOwnProperty('name') && this.showNotification('Lista atualizada.', false);
};
