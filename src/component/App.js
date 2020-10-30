import React , { useReducer , useEffect } from 'react';
import AppContext from '../context';
import reducer from '../reducers';

import Header from './Header';
import Main from './Todo/Main';

import '../css/App.css';


const App = () => {

    //ステートの値を設定
    const initialState = {
        todo: [],
        log: []
    };

    //レデューサーの設定
    const [ state , dispatch ] = useReducer( reducer , initialState ); 

    return (
        <AppContext.Provider value={{ state , dispatch }}>
            <Header />
            <Main />
        </AppContext.Provider>
    );
}


export default App;