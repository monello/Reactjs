import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
    state = {
        userInput: ''
    };

    inputChangedHandler = (event) => {
        this.setState({userInput: event.target.value})
    };

    deleteCharacterHandler = (charIndex) => {
        const charStr = this.state.userInput.split('');
        charStr.splice(charIndex, 1);
        this.setState({
            'userInput': charStr.join('')
        });
    };

    render() {
        const charList = this.state.userInput.split('').map((ch, index) => {
           return (<Char key={index} character={ch} delete={() => this.deleteCharacterHandler(index)}/>)
        });

        return (
            <div className="App">
                <input type="text" onChange={this.inputChangedHandler} value={this.state.userInput}/>
                <p>Text Length: {this.state.userInput.length}</p>
                <Validation inputLength={this.state.userInput.length} />
                {charList}
            </div>
        );
    }
}

export default App;
