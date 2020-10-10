import React , { Component } from 'react';
import { connect } from 'react-redux';
import '../css/App.css';
import { addTodo } from './Store';

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            item:       '',
        }
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    doChange(e){
        if( e.target.value.length > this.props.data.maxlength ){
            alert(e.target.value + "は長すぎます(最大"+ this.props.data.maxlength+"文字)");
            e.target.value = e.target.value.substr(0,this.props.data.maxlength)
        }
        this.setState({
            item:   e.target.value
        });
    }

    doAction(e){
        e.preventDefault();
        if(this.state.item !== ''){
            let action = addTodo( this.state.item );
            this.props.dispatch( action );
            this.setState({
                item:   ''
            });
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={ this.doAction } >
                    <input type="text" onChange={ this.doChange } 
                        size={ this.props.data.maxlength }/>
                    <input type="submit" value="追加" />
                </form>
                {/* <p>{this.state.item}</p> */}
            </div>
        );
    }
}

export default connect( (state)=>state )( AddForm );