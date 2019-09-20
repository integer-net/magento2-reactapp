import { combineReducers } from 'redux';
import user from './user';
import catalog from './catalog';

const rootReducer = combineReducers({
  user: user,
  catalog: catalog
});

export default rootReducer;
