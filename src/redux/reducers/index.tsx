import { combineReducers } from 'redux';
import route from './routerReducer';
import user from './userReducer';
import toast from './toastReducer';
import util from './utilReducer';
import worker from './workerReducer';
import trade from './tradeReducer';

const allReducers = combineReducers({
  route,
  user,
  toast,
  trade,
  util,
  worker
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default (state: any, action: { [key: string]: any }) => {
  return rootReducer(action.type === 'RESET_APP_SUCCESS' ? { auth: { loggedIn: false } } : { ...state }, action);
};
