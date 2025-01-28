import axios from 'axios';

export const searchCard = async function (this: any, query: string) {
  const { data } = await axios.get(`http://localhost:3000/api/cards?q=${query}`);
  this.searchResults = data;
};
