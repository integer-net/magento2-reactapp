import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../../store'
import Product from "../Product";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Product/>
      </Provider>
    );
  };
}

export default App;
