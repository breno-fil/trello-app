import List from '@/typings/list';
import axios from 'axios';

export const deleteList = async function (this: any, list_id: List['id']) {
  
  await axios.delete(`http://localhost:3000/api/lists/${list_id}`);

  this.lists = this.lists.filter((item: List) => item.id !== list_id);
  this.sortLists();
};
