import React , { useReducer , useEffect } from 'react';
import AppContext from '../context';
import reducer from '../reducers';

import Header from './Header';
import Main from './Todo/Main';

import '../css/App.css';

//AWS認証フロー実装用
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';


const App = () => {
    //ローカルストレージに保存する時のキーを設定
    const APP_KEY = 'MyTaskTodo';

    //ローカルストレージからステートの値を取得
    //getItemは返り値に真偽値を返す
    const appState = localStorage.getItem( APP_KEY );

    //ステートの値を設定
    const initialState = appState ? JSON.parse( appState ) :{
        todo: [],
        log: []
    };

    //レデューサーの設定
    const [ state , dispatch ] = useReducer( reducer , initialState ); 

    //ステートの値が変更された時、ステートをローカルストレージに保存
    useEffect( ()=> {
        //引数を全て文字列に変換する
        const string = JSON.stringify(state);
        //ローカルストレージに保存
        localStorage.setItem( APP_KEY , string );
    }, [state]);

    return (
        <AppContext.Provider value={{ state , dispatch }}>
            <Header />
            <Main />
            <AmplifySignOut />
        </AppContext.Provider>
    );
}


export default withAuthenticator(App);