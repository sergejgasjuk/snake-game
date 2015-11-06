import Reflux from "reflux";
import UserActions from "../actions/UserActions";

let UserStore = Reflux.createStore({
  listenables: [],
  userPoint: 11,

  getUserPoint() {
    return this.userPoint;
  }

});

export default UserStore;
