import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      roundNum: 0,
      message: "",
      shownColors: []
    }
  }

  handleStartClick = () => {
      this.play();
      if (this.state.roundNum === 0) {
      this.setState({ message:  "Click on colors to repeat the sequence shown"});
    } else if (this.state.roundNum > 0) {
      this.setState({ message: "Game in progress" });
    }
  }

  play = () => {
    const colors = ['red', 'yellow', 'blue', 'green'];
    //creates a random number between 0 and 3 picks a color corresponding
    //to number from colors array and pushes it into shown array. 
    let randColor = Math.floor((Math.random() * colors.length));
    const shownColors = [ ...this.state.shownColors ];
    shownColors.push(colors[randColor]);
    this.setState({ shownColors });
    //delay before sequence is shown to player.
    //setTimeout(blinkSequence, 1000);
    //call the function that records player's response clicks.
    //this.pushResponse();
  }

  render() {
    return (
      <div className="App">
        <h1>Simon</h1>
        <div className="message">{this.state.message}</div>
        <div id="board">
          <div className="color" id="red"></div>
          <div className="color" id="blue"></div>
          <div className="color" id="green"></div>
          <div className="color" id="yellow"></div>
        </div>
        <div id="score">Score: </div>
        <button id="start"
                onClick={this.handleStartClick}>
                  Start
        </button>
      </div>
    );
  }
}

export default App;
