
import { BrowserPersistence } from '../../util/index';

const storage = new BrowserPersistence();

const isSignedIn = () => !!storage.getItem('signin_token');

const initialState = {
  currentUser: {
    email: '',
    firstname: '',
    lastname: ''
  },
  isSignedIn: isSignedIn(),
};

export default (
  state = initialState,
  { payload, type, error }
) => {
  switch (type) {
    default: {
      return state;
    }
  }
};