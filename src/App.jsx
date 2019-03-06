import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictaphone from "./Components/Dictaphone/Dictaphone";

class App extends Component {
  state = {
    searchTerms: {}
  };

  getSearchTerms = words => {
    this.setState({ searchTerms: words });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello...</p>

          <div>
            Learn React
            <Dictaphone
              sendSearchTerms={this.getSearchTerms}
              currentSearchTerms={this.state.searchTerms}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
