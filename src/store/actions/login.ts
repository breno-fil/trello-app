import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const login = async function (this: any, email: string, password: string) {
  await axios
    .post('http://localhost:3000/api/users/login', { email, password })
    .then(({ data }) => {
      // const token = data.accessToken;
      const token = data.token;
      const user: any = jwtDecode(token)
      
      const id = user.id;
      const email = user.email;
      const username = user.username;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      document.cookie = `auth_token=${token}`;
      
      this.activeUser.id = id;
      this.activeUser.email = email;
      this.activeUser.username = username;
      this.activeUser.accessToken = token;

      this.user(this.activeUser.id);
    })
    .catch(({ response }) => {
      this.showNotification(response.data, true);
    });
};
