import axios from 'axios';
import { useStore } from '../store';
import { jwtDecode } from 'jwt-decode';

export const signup = async function (this: any, username: string, email: string, password: string) {
  await axios
    .post('http://localhost:3000/api/users/register', { username, email, password })
    .then(({ data }) => {

      const token = data.token;
      const user: any = jwtDecode(token);
      
      const id = user.id;
      const email = user.email;
      const username = user.username;
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      document.cookie = `auth_token=${token}`;
      
      var state = useStore();

      this.activeUser.id = id;
      this.activeUser.email = email;
      this.activeUser.loggedIn = true;
      this.activeUser.username = username;
      this.activeUser.accessToken = token;
      
      state.activeUser = this.activeUser;

      this.user(this.activeUser.id)
      
      this.showNotification('User was successfully created', false);
    })
    .catch((e) => {
      this.showNotification(e.response.data, true);
    });
};
