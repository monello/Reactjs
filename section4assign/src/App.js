import React, { Component } from 'react';
import './App.css';
import Validation from "./Validation/Validation";
import Char from "./Char/Char";

class App extends Component {
    state = {
        typedString: '',
        charlen: 0,
        message: 'Text too short'
    };

    inputChangeHandler = (event) => {
        const inputStr = event.target.value;
        let charlen = inputStr.length;
        this.setState({typedString: inputStr});
        this.setState({charlen: charlen});
        this.setState({
            message: Validation(charlen)
        });
    };

    render() {
        const strArr = this.state.typedString.split('');
        const elements = strArr.map((char, index) => {
           return (
               Char(char)
           )
        });
        return (
            <div className="App">
                <input type="text" onChange={this.inputChangeHandler} />
                <p>Text length: {this.state.charlen} | {this.state.message}</p>
                {elements}
            </div>
        );
    }
}

export default App;
