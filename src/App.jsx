import React, { Component } from "react";
import "./App.css";
import Dictaphone from "./Components/Dictaphone/Dictaphone";

class App extends Component {
  state = {
    searchTerms: {},
    command: ""
  };

  getSearchTerms = words => {
    this.setState({ searchTerms: words });
  };

  getCommand = words => {
    this.setState({ command: words });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>What are your commands?</p>
          <img
            src={require("./img/samaritan-signal.png")}
            className="App-logo"
            alt="logo"
          />
          <div>{this.state.command}</div>
          <div>
            <Dictaphone
              sendSearchTerms={this.getSearchTerms}
              sendCommand={this.getCommand}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
