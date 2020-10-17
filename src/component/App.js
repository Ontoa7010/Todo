import React , { useReducer , useEffect } from 'react';
import AppContext from '../context';
import reducer from '../reducers';

import Header from './Header';
import Main from './Main';

import '../css/App.css';

const App = () => {
    //ローカルストレージに保存する時のキーを設定
    const APP_KEY = 'MyTaskTodo';

    //ローカルストレージからステートの値を取得
    //getItemは返り値に真偽値を返す
    const appState = localStorage.getItem( APP_KEY );

    //ステートの値を設定
    const initialState = appState ? JSON.parse( appState ) :{
        todo: [],
    };

    //レデューサーの設定
    const [ state , dispatch ] = useReducer( reducer , initialState ); 

    //ステートの値が変更された時、ステートをローカルストレージに保存
    useEffect( ()=> {
        //引数を全て文字列に変換する
        const string = JSON.stringify(state);
        localStorage.setItem( APP_KEY , string );
    }, [state]);

    return (
        <AppContext.Provider value={{ state , dispatch }}>
            <Header />
            <Main />
        </AppContext.Provider>
    );
}


export default App;