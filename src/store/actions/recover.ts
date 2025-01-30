import axios from 'axios';

export const recover = async function (this: any, email: string) {
  await axios
    .get(`http://localhost:3000/api/users?email=${email}`)
    .then(({ data }) => {
      this.showNotification('Usuário encontrado', false);
      console.log(`recover :: data :: ${JSON.stringify(data)}`);
    })
    .catch(() => {
      this.showNotification('Usuário não encontrado', true);
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
};
