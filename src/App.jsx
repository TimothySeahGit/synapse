import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictaphone from "./Components/Dictaphone/Dictaphone";

class App extends Component {
  handleClick = words => {
    this.setState({ decisionPage: true });
    console.log("HELLO!!!!!");
    words.preventDefault();
  };

  getData(val) {
    // do not forget to bind getData in constructor
    console.log(val);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello...</p>

          <div>
            Learn React
            <Dictaphone
              handleClick={this.handleClick}
              handleChange={this.handleChange}
              sendData={this.getData}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
