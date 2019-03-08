import React, { Component } from "react";
import "./App.css";
import Dictaphone from "./Components/Dictaphone/Dictaphone";
import { searchPhotos } from "./services/unsplash";

class App extends Component {
  state = {
    searchTerms: { nouns: "", topics: "" },
    command: "",
    resultList: []
  };

  timerID = 0;

  async componentDidMount() {
    this.timerID = setInterval(async () => {
      try {
        const searchTerm =
          this.state.searchTerms.nouns || this.state.searchTerms.topics;

        const response = await searchPhotos(searchTerm);
        const results = response.results;
        this.setState({ resultList: results });

        const rng = Math.floor(Math.random() * results.length);
        const oneResult = response.results[rng].urls.regular;
        this.setState({ newBackground: oneResult });
      } catch (err) {
        console.log(err);
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getSearchTerms = words => {
    this.setState({ searchTerms: words });
  };

  getCommand = words => {
    this.setState({ command: words });
  };

  getBackground = style => {
    this.setState({ style: style });
  };

  render() {
    const imgUrl = this.state.newBackground;
    const divStyle = {
      backgroundImage: "url(" + imgUrl + ")"
    };

    return (
      <div className="App">
        <div className="Unsplash" style={divStyle}>
          <header className="App-header">
            <p>Speak</p>
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
      </div>
    );
  }
}

export default App;
