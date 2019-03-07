import React, { Component } from "react";
import "./App.css";
import Dictaphone from "./Components/Dictaphone/Dictaphone";
// import Background from "./img/bg/lensgrid.png";
import Background from "./Components/Background/Background";
import { searchPhotos } from "./services/unsplash";

class App extends Component {
  state = {
    searchTerms: {},
    command: "",
    resultList: []
  };

  async componentDidMount() {
    setInterval(async () => {
      try {
        const searchTerm = this.state.command;
        const response = await searchPhotos(searchTerm);
        console.log(response.results);
        const results = response.results;
        this.setState({ resultList: results });

        const rng = Math.floor(Math.random() * 10);
        console.log(rng);
        const oneResult = response.results[rng].urls.regular;

        console.log(oneResult);

        this.setState({ newBackground: oneResult });
      } catch (err) {
        console.log(err);
      }
    }, 5000);
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
        <div className="AppTest" style={divStyle}>
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
      </div>
    );
  }
}

export default App;
