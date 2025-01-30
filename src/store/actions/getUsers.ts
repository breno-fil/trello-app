import axios from 'axios';

export const getUser = async function (this: any) {
  await axios
    .get(`http://localhost:3000/api/users/`)
    .then(({ data }) => {
      this.activeUser.loggedIn = true;
      this.activeUser.email = data.email;
      this.activeUser.id = data.id;
    })
    .catch(() => {
      this.showNotification('Não foi possível buscar os usuários.', true);
      document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
};
