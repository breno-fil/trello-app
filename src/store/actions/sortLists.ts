import List from '@/typings/list';

export const sortLists = async function (this: any) {
  this.lists.forEach((list: List, index: number) => {
    console.debug(`sortLists :: list     :: ${JSON.stringify(list)}`);
    console.debug(`sortLists :: position :: ${index}`);
    // this.patchList(list, { position: index });
    this.updateList(list, {position: index});
  });
};
