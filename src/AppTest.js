import React , { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

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
    constructor(props){
        super(props);
        this.doAction = this.doAction.bind(this);
    }

    doAction(e){
        this.props.dispatch( { type: 'ADD'} );
    }
    render(){
        return(
        <div>
            <h1>{this.props.title}</h1>
            <ul>
                {this.props.data.map( (value)=>(
                    <li>{value}</li>
                ))};
            </ul>
            <button onClick={this.doAction}>Click</button>
            {/* <Form /> */}
        </div>
        );
    }
}

CheckList = connect( mappingState )( CheckList );

// class Form extends Component{
//     data =[
//         "SampleA",
//         "SampleB",
//     ];
//     input = '';

//     constructor(props){
//         super(props);
//         this.state ={
//             list:       this.data,
//             maxlength:  10
//         }
//         this.doChange = this.doChange.bind(this);
//         this.doSubmit = this.doSubmit.bind(this);
//     }

//     doCheck(event){
//         alert(event.target.value + "は長すぎます。(最大10文字")
//     }

//     doChange(event){
//         if(event.target.value.length > this.state.maxlength){
//             this.doCheck(event);
//             event.target.value = event.target.value.substr( 0, this.state.maxlength );
//         }

//         this.input = event.target.value;
//     }

//     doSubmit(event){
//         this.data.push(this.input);
//         this.setState({
//             list:   this.data
//         });
//         event.preventDefault();
//     }

//     render(){
//         return(
//         <div>
//             <form onSubmit={this.doSubmit} >
//                 <input type="text" onChange={this.doChange} size="40" />
//                 <input type="submit" value="追加" />
//             </form>
//             <List data={this.state.list}/>
//         </div>
//         );
//     }
// }

// class List extends Component{
//     id = 0;
//     render(){
//         let data = this.props.data;
//         return(
//         <ul>
//             { 
//             data.map( (item) => (
//             <CheckBox value={item}  key={this.id++} />
//             ))}
//         </ul>
//         );
//     }
// }

// class CheckBox extends Component{
//     render(){
//         return(
//         <li>
//             <label>
//             <input type="checkbox"/>{this.props.value}
//             </label>
//         </li>
//         );
//     }
// }

export default App;