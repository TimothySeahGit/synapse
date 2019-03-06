import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class Dictaphone extends Component {
  state = {
    stateTranscript:
      "Donald Trump is in the Bahamas fighting with the Jerome Powell and the federal reserve",
    //this.props.transcript,
    // "hello there how are you today i am fine thank you very much"
    stateNlp: {}
  };

  sliceTranscript = () => {
    const { transcript } = this.props;
    const newTranscript = transcript.split(" ");
    const len = newTranscript.length;
    // console.log(len);
    const min = len - 10 < 0 ? 0 : len - 10;
    const shortTranscript = newTranscript.slice(min, len).join(" ");
    this.setState({ stateTranscript: shortTranscript });
  };

  nlpTranscript = () => {
    const nlp = require("compromise");
    const { stateTranscript } = this.state;
    const nlpTranscript = nlp(stateTranscript);
    const people = nlpTranscript
      .people()
      .random(1)
      .out();
    const places = nlpTranscript
      .places()
      .random(1)
      .out();
    const organizations = nlpTranscript
      .organizations()
      .random(1)
      .out();
    const nouns = nlpTranscript
      .nouns()
      .random(1)
      .out();
    const update = { people, places, organizations, nouns };
    this.props.sendData(nouns);
    this.setState({ stateNlp: update });
  };

  componentDidMount() {
    setInterval(() => {
      this.sliceTranscript();
      this.nlpTranscript();
    }, 2000);
  }

  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    const { stateTranscript, stateNlp } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    //console.log({ transcript });

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={this.props.handleClick}>ShortenState</button>

        <div data-testid="transcripty">{stateTranscript}</div>
        <div onClick={this.props.handleChange}>{stateNlp.nouns}</div>
      </div>
    );
  }
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);
