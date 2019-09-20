import { createStore } from 'redux';
import enhancers from './enhancers';
import rootReducer from './reducers';

export default createStore(rootReducer, enhancers);