import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import todoReducer from './Store';
import App from './AppTest';

//レンダリング
ReactDOM.render(
  <Provider store={ todoReducer }>
    <App />
  </Provider>,
  document.getElementById('root')
);


