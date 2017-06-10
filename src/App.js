import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      roundNum: 1,
      message: "Click Start To Begin",
      shownColors: [],
      clickedColors: [],
      redClicked: false,
      blueClicked: false,
      greenClicked: false,
      yellowClicked: false,
      inProgress: false,
      userSuccess: null,
      userClicks: 0,
      score: null
    }
  }

  handleRedClick = () => {
    this.playsound();
    setTimeout(() => {
      this.setState({ redClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ redClicked: false });
    }, 600);   
    const clickedColors = [ ...this.state.clickedColors ];
    clickedColors.push('red');
    let userClicks = this.state.userClicks + 1;
    this.setState({ clickedColors, userClicks }); 
    setTimeout(() => {
      this.checkResponse();
    }, 100);
  }

  handleBlueClick = () => {
    this.playsound();
    setTimeout(() => {
      this.setState({ blueClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ blueClicked: false });
    }, 600);  
    const clickedColors = [ ...this.state.clickedColors ];
    clickedColors.push('blue');
    let userClicks = this.state.userClicks + 1;
    this.setState({ clickedColors, userClicks });  
    setTimeout(() => {
      this.checkResponse();
    }, 100);
  }

  handleGreenClick = () => {
    this.playsound();
    setTimeout(() => {
      this.setState({ greenClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ greenClicked: false });
    }, 600);  
    const clickedColors = [ ...this.state.clickedColors ];
    clickedColors.push('green');
    let userClicks = this.state.userClicks + 1;
    this.setState({ clickedColors, userClicks }); 
    setTimeout(() => {
      this.checkResponse();
    }, 100);  
  }

  handleYellowClick = () => {
    this.playsound();
    setTimeout(() => {
      this.setState({ yellowClicked: true });
    }, 200);
    setTimeout( () => {
      this.setState({ yellowClicked: false });
    }, 600);  
    const clickedColors = [ ...this.state.clickedColors ];
    clickedColors.push('yellow');
    let userClicks = this.state.userClicks + 1;
    this.setState({ clickedColors, userClicks }); 
    setTimeout(() => {
      this.checkResponse();
    }, 100); 
  }

  handleStartClick = () => {
    this.refs.audioThree.play();
    if (this.state.inProgress === false) { 
      this.play();
    }
      if (this.state.roundNum === 1) {
      this.setState({ 
        message:  "Click on colors to repeat the sequence shown",
        score: null
      });
    } else if (this.state.roundNum > 1) {
      this.setState({ message: "Game in progress" });
    }
  }

  play = () => {
    this.setState({ inProgress: true });
    const colors = ['red', 'yellow', 'blue', 'green'];
    //creates a random number between 0 and 3 picks a color corresponding
    //to number from colors array and pushes it into shown array. 
    let randColor = Math.floor((Math.random() * colors.length));
    const shownColors = [ ...this.state.shownColors ];
    shownColors.push(colors[randColor]);
    this.setState({ shownColors });
    //delay before sequence is shown to player.
    setTimeout(this.blinkSequence, 1000);
  }

   blinkSequence = () => {
    for (let i = 0; i < this.state.shownColors.length; i ++) {
      if (this.state.shownColors[i] === 'red') {
        setTimeout(() => {
          this.setState({ redClicked: true });
          this.refs.audioTwo.play();
          setTimeout(()=> {
            this.setState({ redClicked: false });
          }, 400);
        }, i * 800);
      } else if (this.state.shownColors[i] === 'blue') {
        setTimeout(() => {
          this.setState({ blueClicked: true });
          this.refs.audioTwo.play();
          setTimeout(() => {
            this.setState({ blueClicked: false });
          }, 400);
        }, i * 800);
      } else if (this.state.shownColors[i] === 'green') {
        setTimeout(() => {
          this.setState({ greenClicked: true });
          this.refs.audioTwo.play();
          setTimeout(() => {
            this.setState({ greenClicked: false });
          }, 400);
        }, i * 800);
      } else if (this.state.shownColors[i] === 'yellow') {
        setTimeout(() => {
          this.setState({ yellowClicked: true });
          this.refs.audioTwo.play();
          setTimeout(() => {
            this.setState({ yellowClicked: false });
          }, 400);
        }, i * 800);
      } 
    }
  }

checkResponse = () => {
  let { shownColors, clickedColors, userClicks, roundNum } = this.state;
  for (let i = 0; i < clickedColors.length; i++) {
    if (clickedColors[i] === shownColors[i]) {
      this.setState({ userSuccess: true });
    } else if (clickedColors[i] !== shownColors[i]) {
      this.setState({ 
        message: 'Game Over. Click Start to Play Again',
        userSuccess: false,
        roundNum: 1,
        shownColors: [],
        clickedColors: [],
        inProgress: false,
        userClicks: 0
      });
    }
  }
  if (this.state.userSuccess === true && userClicks === shownColors.length) {
    this.setState({
      roundNum: roundNum + 1,
      score: roundNum,
      clickedColors: [],
      userClicks: 0
    });
    this.play();
  }
}

  playsound = () => {
    this.refs.audioOne.play();
  }


  render() {
    let redLit = this.state.redClicked ? 'red-lit color' : 'red color';
    let blueLit = this.state.blueClicked ? 'blue-lit color' : 'blue color';
    let greenLit = this.state.greenClicked ? 'green-lit color' : 'green color';
    let yellowLit = this.state.yellowClicked ? 'yellow-lit color' : 'yellow color';
    return (
      <div className="App">
        <h1>Simon</h1>
        <div className="message">{this.state.message}</div>
        <div id="board">
          <div className="top-row">         
            <div className={greenLit} onClick={this.handleGreenClick}></div>
            <div className={yellowLit} onClick={this.handleYellowClick}></div>
          </div>
          <div className="bottom-row">
            <div className={redLit} onClick={this.handleRedClick}></div>
            <div className={blueLit} onClick={this.handleBlueClick}></div>
          </div>
        </div>
        <div id="score">Score: {this.state.score}</div>
        <button id="start"
                onClick={this.handleStartClick}>
                  Start
        </button>
        <audio ref="audioOne" >
          <source src="../sounds/simonSound1.mp3" type="audio/mpeg"></source>
        </audio>
        <audio ref="audioTwo" >
          <source src="../sounds/simonSound2.mp3" type="audio/mpeg"></source>
        </audio>
        <audio ref="audioThree" >
          <source src="../sounds/simonSound3.mp3" type="audio/mpeg"></source>
        </audio>
      </div>
    );
  }
}

export default App;
