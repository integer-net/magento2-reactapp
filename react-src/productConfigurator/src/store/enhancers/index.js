
import middleware from '../middleware';
import composeEnhancers from './composeEnhancers';

const enhancers = composeEnhancers(middleware);

export default enhancers;