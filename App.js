import React, { Component } from "react";
import { Provider } from 'react-redux';
import configureStore from './src/store';
import BrollyApp from './src/BrollyApp';

const store = configureStore({}) //initial state passed here if needed

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <BrollyApp />
      </Provider>
    )
  }
}
