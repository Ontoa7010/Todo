import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './AppTest';

let data = ['Sample','Sample2'];

let state_value = {
  title:    'React',
  data:     data,
}

function todoList( state = state_value, action ){
  switch( action.type ){
    case 'ADD':
      return addReduce( state, action );
    case 'DELETE':
      return {
        title: 'TEST2',
        data: data,
      };
    default:
      return state;
  }
}

//アクションクリエーター
function addReduce( state , action ){
  return {
    title: 'TEST1',
    data:   data,
  }
}

//ストアを作成
let store = createStore(todoList);

//レンダリング
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


