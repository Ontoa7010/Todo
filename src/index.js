import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import todoReducer from './component/Store';
import App from './component/App';
import ReadDatabase from './component/Data';
// import Add from './component/Data';

// Add();
ReadDatabase();

//レンダリング
ReactDOM.render(
  <Provider store={ todoReducer }>
    <App />
  </Provider>,
  document.getElementById('root')
);


