import React , { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AddForm from './AddForm';

function mappingState(state){
    return state;
}

class App extends Component{
    render(){
        return <CheckList />;
    }
}
//ストアのコネクト
App = connect()(App);

class CheckList extends Component{
    render(){
        return(
        <div>
            <h1>{this.props.title}</h1>
            <AddForm />
            <List />
        </div>
        );
    }
}
CheckList = connect( mappingState )( CheckList );

class List extends Component{
    render(){
        return <ul><Item /></ul>;
    }
}

List = connect( mappingState )( List );

class Item extends Component{
    id = 0;
    render(){
        return(<div>
            { this.props.data.map( (value)=>(
                <li key={ this.id++ }><Checkbox />{value}
                </li>
            ))}
        </div>
        );
    }
}

Item = connect( mappingState )( Item );

class Checkbox extends Component{
    render(){
        return(
            <input type="checkbox"/>
        );
    }
}

Checkbox = connect( mappingState )( Checkbox );


export default connect( mappingState )( App );