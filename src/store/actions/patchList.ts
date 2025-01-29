import List from '@/typings/list';
import axios from 'axios';

export const patchList = async function (this: any, list: List, changes: Partial<List>) {
  const { id } = list;
  await axios.patch(`http://localhost:3000/api/lists/${id}`, changes).then(({ data }) => {
    console.debug(`CHANGES DATA :: ${JSON.stringify(data)}`)
    const patchedListIndex: number = this.lists.findIndex((c: List) => c.id === id);
    data.cards = this.lists[patchedListIndex].cards;
    this.lists[patchedListIndex] = data;
  });
  changes.hasOwnProperty('name') && this.showNotification('List was renamed', false);
};
