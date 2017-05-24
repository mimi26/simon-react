import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      roundNum: 0,
      message: "",
      shownColors: [],
      redClicked: false,
      blueClicked: false,
      greenClicked: false,
      yellowClicked: false
    }
  }

  handleRedClick = () => {
    setTimeout(() => {
      this.setState({ redClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ redClicked: false });
    }, 600);    
  }

  handleBlueClick = () => {
    setTimeout(() => {
      this.setState({ blueClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ blueClicked: false });
    }, 600);    
  }

  handleGreenClick = () => {
    setTimeout(() => {
      this.setState({ greenClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ greenClicked: false });
    }, 600);    
  }

  handleYellowClick = () => {
    setTimeout(() => {
      this.setState({ yellowClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ yellowClicked: false });
    }, 600);    
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
    let redLit = this.state.redClicked ? 'red-lit' : 'color';
    let blueLit = this.state.blueClicked ? 'blue-lit' : 'color';
    let greenLit = this.state.greenClicked ? 'green-lit' : 'color';
    let yellowLit = this.state.yellowClicked ? 'yellow-lit' : 'color';
    return (
      <div className="App">
        <h1>Simon</h1>
        <div className="message">{this.state.message}</div>
        <div id="board">
          <div ref="redDiv" className={`${redLit} "color"`} id="red" onClick={this.handleRedClick}></div>
          <div ref="blueDiv" className={`${blueLit} "color"`} id="blue" onClick={this.handleBlueClick}></div>
          <div ref="greenDiv" className={`${greenLit} "color"`} id="green" onClick={this.handleGreenClick}></div>
          <div ref="yellowDiv" className={`${yellowLit} "color"`} id="yellow" onClick={this.handleYellowClick}></div>
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
