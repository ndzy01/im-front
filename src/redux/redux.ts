import { combineReducers, createStore } from 'redux';
import { User } from './user.redux';

let reducer = combineReducers({ User });
//  window.STATE_FROM_SERVER 可以有第二个参数
let store = createStore(reducer);

export default store;
