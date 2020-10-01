import React , { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodo } from './Store';

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            item:       '',
            maxlength:  10
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }
    doChange(e){
        let input = e.target.value;
        this.setState({
            item:   input
        });
    }

    doAction(e){
        e.preventDefault();
        let action = addTodo( this.state.item );
        this.props.dispatch( action );
        this.setState({
            item:   this.input
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={ this.doAction } >
                    <input type="text" onChange={ this.doChange } />
                    <input type="submit" value="追加" />
                </form>
                <p>{this.state.item}</p>
            </div>
        );
    }
}

export default connect( (state)=>state )( AddForm );