import axios from 'axios';
import { useStore } from '../store';

export const getBoardList = async function (this: any) {
  this.loadingError.show = false;
  this.loadingError.message = '';
  this.loadingError.status = '';
  setTimeout(() => {
    this.loadingError.tooLong = true;
  }, 3000);

  var state = useStore();
  var starred_ids: any = [];
  var user = state.activeUser;

  if (user.loggedIn) {
    
    axios
      .get(`http://localhost:3000/api/board-users?user_id=${user.id}`)
      .then(({ data }) => {
        starred_ids = data.filter((item: any) => {
          return (item.starred == true)
        }).map((item: any) => {
          return item.board_id;
        });
      })
      .finally(async () => {
        axios.get(`http://localhost:3000/api/boards?user_id=${user.id}`).then(({ data }) => {
          var boards = data.map((item: any) => {
            item['starred'] = starred_ids.includes(Number(item.id));
            return item;
          });

          this.boardList.all = boards;
          console.debug(`getBoardList :: BOARD LIST :: ${JSON.stringify(this.boardList.all)}`);
          this.loading = false;
        });
      }).catch(({ response }) => {
        this.loading = false;
        this.loadingError.show = true;
        if (response) {
          this.loadingError.message = response.data.message;
          this.loadingError.status = response.status;
        }
      });

  } else {
    this.loading = false;
  }

};
